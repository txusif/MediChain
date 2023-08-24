import React, { useState } from "react";
import axios from "axios";
import { CustomButton } from "../components";

const FileUploadComponent = ({
  address,
  contentId,
  setContentId,
  fileURI,
  setFileURI,
}) => {
  // const { address } = useStateContext();

  const [file, setFile] = useState("");
  // const [contentId, setContentId] = useState(null);

  const handleFileChange = (event) => {
    console.log(contentId);
    const selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      console.log("Clicked");
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "15db73ce6b671690ea00",
            pinata_secret_api_key:
              "b2bc3242f6023b605204b95560ec3d821ccb314e76f2e4e62ab030b960c08bb2",
          },
        }
      );

      setContentId(response.data.IpfsHash);

      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      setFileURI(ipfsUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="mb-4 font-epilogue font-semibold text-white">
          Upload PDF to Pinata
        </h2>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="font-epilogue font-semibold text-white rounded-l-[10px] bg-[#131324]  w-[235px] cursor-pointer"
        />
        <CustomButton
          btnType="button"
          title="Upload"
          styles="bg-[#1dc071] my-[40px] w-[100px]"
          handleClick={handleUpload}
          isConnected={address && file}
        />
      </div>
    </div>
  );
};

export default FileUploadComponent;
