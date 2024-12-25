import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FileUploadComponent = ({
  address,
  contentId,
  setContentId,
  fileURI,
  setFileURI,
  isLab,
  notify,
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
    console.log("a", isLab);
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
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        }
      );

      setContentId(response.data.IpfsHash);

      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      toast.success("Filehash generated");

      setFileURI(ipfsUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  console.log(import.meta.env.VITE_PINATA_API_KEY);
  console.log(import.meta.env.VITE_PINATA_SECRET_API_KEY);

  return (
    <div>
      <div className="flex">
        {/* <h2 className="mb-4 font-epilogue font-semibold text-white">
          Upload PDF
        </h2> */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="font-epilogue font-semibold items-center justify-center w- text-white rounded-l-[10px] h-[29px] cursor-pointer"
        />
        <div className="h-6 flex">
          <button
            type="button"
            className="bg-[#1dc071] text-white p-4 flex justify-center  items-center font-epilogue font-semibold rounded-[10px]"
            onClick={isLab ? handleUpload : notify}
            disabled={!(address && file)}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
