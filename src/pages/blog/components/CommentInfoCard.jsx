import React, { useContext, useState } from "react";
import moment from "moment";
import { LuChevronDown, LuDot, LuReply, LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/UserContext";
import CommentReplyInput from "../../../components/inputs/CommentReplyInput";
import { API_PATHS } from "../../../utils/ApiPath";
import axiosInstance from "../../../utils/AxiosInstance";

const CommentInfoCard = ({
  commentId,
  authorName,
  authorPhoto,
  content,
  updateOn,
  post,
  replies,
  getAllComments,
  onDelete,
  isSubReply,
}) => {
  const { user, setOpenAuthForm } = useContext(UserContext);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);

  const handleCanelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.COMMENTS.ADD(post._id),
        {
          content: replyText,
          parentComment: commentId,
        }
      );
      toast.success("Reply added successfully");
      setReplyText("");
      setShowReplyForm(false);
      getAllComments();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg cursor-pointer group mb-5">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-8 order-2 md:order-1">
          <div className="flex items-start gap-3">
            <img src={authorPhoto} alt={authorName} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="text-[12px] text-gray-500 font-medium">@{authorName}</h3>
                <LuDot className="text-gray-500" />
                <span className="text-[12px] text-gray-500 font-medium">{updateOn}</span>
              </div>
              <p className="text-sm text-black font-medium">{content}</p>
              <div className="flex items-center gap-3 mt-1.5">
                {!isSubReply && (
                  <>
                    <button
                      className="flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white cursor-pointer"
                      onClick={() => {
                        if (!user) {
                          console.log("User :", user);
                          setOpenAuthForm(true);
                          return;
                        }

                        setShowReplyForm((prevState) => !prevState);
                      }}
                    >
                      <LuReply /> Reply
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-[13px] font-medium text-sky-600 bg-red-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white cursor-pointer"
                      onClick={() =>
                        setShowSubReplies((prevState) => !prevState)
                      }
                    >
                      {replies?.length || 0}{" "}
                      {replies?.length === 1 ? "Reply" : "Replies"}{" "}
                      <LuChevronDown
                        className={`${showSubReplies ? "rotate-180" : ""}`}
                      />
                    </button>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isSubReply && showReplyForm && (
        <CommentReplyInput
          user={user}
          authorName={authorName}
          content={content}
          replyText={replyText}
          setReplyText={setReplyText}
          handleAddReply={handleAddReply}
          handleCancelReply={handleCanelReply}
          disableAutoGen
        />
      )}

      {showSubReplies &&
        replies?.length > 0 &&
        replies.map((reply, index) => (
          <div
            className={`ml-5 ${index === 0 ? "mt-5" : ""}`}
            key={reply._id}
          >
            <CommentInfoCard authorName={reply.author.name}
            authorPhoto={reply.author.profileImageUrl}
            content={reply.content}
            post={reply.post}
            replies={reply.replies || []}
            isSubReply
            updateOn={
              reply.updatedAt ? moment(reply.updatedAt).format("Do MMM YYYY") : "-"
            }
            onDelete={()=> onDelete(reply._id)}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentInfoCard;
