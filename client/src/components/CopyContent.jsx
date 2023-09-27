import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CopyContent = ({ textToBeCopied}) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={textToBeCopied} onCopy={onCopyText}>
      <div>
        {!isCopied && (
          <FontAwesomeIcon
            className="cursor-pointer w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] "
            icon={faCopy}
            style={{ color: "#1dc071" }}
          />
        )}
        {isCopied && (
          <FontAwesomeIcon icon={faCheck} style={{ color: "#1dc071" }} />
        )}
      </div>
    </CopyToClipboard>
  );
};

export default CopyContent;
