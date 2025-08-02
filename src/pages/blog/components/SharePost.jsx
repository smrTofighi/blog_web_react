import React, { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

const SharePost = ({ title }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch((err) => console.error("Error to copy the link", err));
  };

  return (
    <div className="my-6">
      <p className="text-gray-600 font-medium mb-3">Share Post</p>
      <div className="flex items-center gap-4">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} quote={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} quote={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TelegramShareButton url={shareUrl} quote={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl} quote={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <button
          onClick={handleCopyClick}
          className="bg-white hover:bg-sky-50 text-sky-800 font-medium px-2 py-2 rounded-full"
        >
          {isCopied ? (
            <LuCheck className="text-[20px]" />
          ) : (
            <LuCopy className="text-[20px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SharePost;
