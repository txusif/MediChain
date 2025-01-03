// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ChainlinkClient, Chainlink} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract MedichainDapp is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    address owner;

    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    constructor() {
        owner = msg.sender;
        // setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        _setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);

        // Sepolia testnet
        // oracle = 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD;
        oracle = 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3;
        // Mumbai testnet
        // oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;

        jobId = "ca98366cc7314957b8c012c72f05aeeb"; // For single word response (uint256)
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    // Structs to store data
    struct GeneralInfo {
        int256 age;
        int256 height;
        int256 weight;
        string gender;
        string bloodGroup;
    }

    struct File {
        string fileHash;
        string category;
        address user;
        address byLab;
        uint256 dated;
        GeneralInfo generalInfo;
    }

    struct AuthUser {
        string name;
        address _address;
        string auth_id;
        uint256 authOnDate;
    }

    struct Applicant {
        address applicantAddress;
        string name;
        string auth_id;
        uint256 applyId; // 0= Doctor, 1= Lab
    }

    struct Campaign {
        address payable owner;
        string title;
        string description;
        string fileHash;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    // Mappings to store data
    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    address[] Doctors;
    address[] Labs;

    mapping(address => bool) public AuthorisedLab;
    mapping(address => bool) public AuthorisedDoc;
    mapping(address => bool) public UserExists;
    mapping(string => bool) private IdUsed;

    mapping(address => AuthUser) AuthDetails;
    mapping(bytes32 => Applicant) private GetApplicant;
    mapping(address => string[]) UserReports; // maintain reports belonging to a user with address as key
    mapping(string => File) Files;

    // Events to emit
    event LabAuthorised(
        string name,
        address _authAddre,
        string AuthId,
        uint256 AuthOnDate
    );

    event DoctorAuthorised(
        string name,
        address _authAddre,
        string AuthId,
        uint256 AuthOnDate
    );

    event ApplicationResult(
        address applicantAddress,
        string AuthId,
        bool status
    );

    event ReportSaved(
        string fileId,
        string category,
        address PatientName,
        address LabName,
        uint256 AddedAt,
        int256 age,
        int256 height,
        int256 weight,
        string gender,
        string bloodGroup
    );

    // Modifiers to restrict access
    modifier OnlyOwner() {
        require(
            msg.sender == owner,
            "you are not authorised to perform the action!"
        );
        _;
    }

    modifier OnlyLabs() {
        require(AuthorisedLab[msg.sender], "you are not registered as a lab");
        _;
    }

    // Function to get user reports
    function getUserReports(
        address _address
    ) public view returns (string[] memory) {
        return UserReports[_address];
    }

    // Function to get detailed report
    function GetDetailedReport(
        string memory _fileHash
    ) public view returns (File memory) {
        return Files[_fileHash];
    }

    // Function to get all labs
    function GetAllLabs() public view returns (address[] memory) {
        return Labs;
    }

    // Function to get all doctors
    function GetAllDoctors() public view returns (address[] memory) {
        return Doctors;
    }

    // Function to get authentication details
    function GetAuthDetails(
        address _address
    ) public view returns (AuthUser memory) {
        return AuthDetails[_address];
    }

    // Function to check authorisation
    function checkAuthorisation(
        string memory name,
        string memory id,
        uint256 applyId
    ) public returns (bytes32 requestId) {
        require(
            applyId == 0 || applyId == 1,
            "Apply id should be either 0 or 1"
        );
        require(!IdUsed[id], "Id already used"); // to stop function spamming

        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory url = append("https://api-medichain.onrender.com/", id);
        req._add("get", url);
        req._add("path", "res");
        int256 timesAmount = 10;
        req._addInt("times", timesAmount);

        requestId = _sendChainlinkRequestTo(oracle, req, fee);
        GetApplicant[requestId] = Applicant(msg.sender, name, id, applyId);

        return requestId;
    }

    // Function to fulfill request
    function fulfill(
        bytes32 _requestId,
        uint256 _res
    ) public recordChainlinkFulfillment(_requestId) {
        Applicant memory applicant = GetApplicant[_requestId];
        if (_res == 1000) {
            if (applicant.applyId == 0) {
                addAuthDoc(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.auth_id
                );
            } else {
                addAuthLab(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.auth_id
                );
            }
            emit ApplicationResult(
                applicant.applicantAddress,
                applicant.auth_id,
                true
            );
        } else {
            emit ApplicationResult(
                applicant.applicantAddress,
                applicant.auth_id,
                false
            );
        }
        IdUsed[applicant.auth_id] = true;
    }

    // Function to save report
    function SaveReport(
        string memory _fileHash,
        string memory category,
        address user_address,
        GeneralInfo memory _generalInfo
    ) public OnlyLabs returns (bool) {
        UserReports[user_address].push(_fileHash);
        if (!UserExists[user_address]) {
            UserExists[user_address] = true;
        }

        File memory _file;
        _file.fileHash = _fileHash;
        _file.category = category;
        _file.user = user_address;
        _file.byLab = msg.sender;
        _file.dated = block.timestamp;
        _file.generalInfo = _generalInfo;

        Files[_fileHash] = _file;

        emit ReportSaved(
            _fileHash,
            category,
            user_address,
            msg.sender,
            block.timestamp,
            _generalInfo.age,
            _generalInfo.height,
            _generalInfo.weight,
            _generalInfo.gender,
            _generalInfo.bloodGroup
        );
        return true;
    }

    // Function to set owner
    function setOwner(address _owner) public OnlyOwner returns (bool) {
        owner = _owner;
        return true;
    }

    // Function to set oracle
    function setOracle(address _oracle) public OnlyOwner returns (bool) {
        oracle = _oracle;
        return true;
    }

    // Function to set job ID
    function setJobId(bytes32 _jobId) public OnlyOwner returns (bool) {
        jobId = _jobId;
        return true;
    }

    // Function to set fee
    function setFee(uint256 _fee) public OnlyOwner returns (bool) {
        fee = _fee;
        return true;
    }

    // Function to add authorised lab
    function addAuthLab(
        address _authAddress,
        string memory name,
        string memory _authId
    ) private {
        require(!AuthorisedLab[_authAddress], "Already registered!");

        Labs.push(_authAddress);
        AuthorisedLab[_authAddress] = true;

        AuthUser memory _authuser;
        _authuser.name = name;
        _authuser._address = _authAddress;
        _authuser.auth_id = _authId;
        _authuser.authOnDate = block.timestamp;
        AuthDetails[_authAddress] = _authuser;

        emit LabAuthorised(name, _authAddress, _authId, block.timestamp); //emit an event when new authorisation is given
    }

    // Function to add authorised doctor
    function addAuthDoc(
        address _authAddress,
        string memory name,
        string memory _authId
    ) private {
        require(!AuthorisedDoc[_authAddress], "Already registered!");

        Doctors.push(_authAddress);
        AuthorisedDoc[_authAddress] = true;

        AuthUser memory _authuser;
        _authuser.name = name;
        _authuser._address = _authAddress;
        _authuser.auth_id = _authId;
        _authuser.authOnDate = block.timestamp;
        AuthDetails[_authAddress] = _authuser;

        emit DoctorAuthorised(name, _authAddress, _authId, block.timestamp); //emit an event when new authorisation is given
    }

    // Function to append strings
    function append(
        string memory _url,
        string memory _id
    ) private pure returns (string memory) {
        return string(abi.encodePacked(_url, _id));
    }

    // Function to create campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _fileHash,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = payable(_owner);
        campaign.title = _title;
        campaign.description = _description;
        campaign.fileHash = _fileHash;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // Function to donate to campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    // Function to get donators
    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Function to get all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
        // if (allCampaigns.deadline > block.timestamp) {
        // return allCampaigns;
        // }
    }
}
