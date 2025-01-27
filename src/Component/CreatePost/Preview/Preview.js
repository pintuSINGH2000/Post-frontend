import React, { useState } from "react";
import styles from "./preview.module.css";
import { AiOutlineMobile } from "react-icons/ai";
import { IoMdTabletPortrait } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";
import { FaEarthAmericas } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

const Preview = ({ postData }) => {
  const [activeDevice, setActiveDevice] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedContent = postData.slice(0, 130);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(postData)
      .then(() => {
        toast.success("post text copied successfully");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.previewHeader}>
        <h3>Post Preview</h3>
        <div className={styles.rightHeader}>
          Device:
          <div className={styles.devices}>
            <AiOutlineMobile
              className={`${styles.deviceIcon} ${
                activeDevice === 1 && styles.active
              }`}
              onClick={() => setActiveDevice(1)}
            />
            <IoMdTabletPortrait
              className={`${styles.deviceIcon} ${
                activeDevice === 2 && styles.active
              }`}
              onClick={() => setActiveDevice(2)}
            />
            <RiComputerLine
              className={`${styles.deviceIcon} ${
                activeDevice === 3 && styles.active
              }`}
              onClick={() => setActiveDevice(3)}
            />
          </div>
        </div>
      </div>
      <div className={styles.PreviewMain}>
        <button className={styles.copyBtn} onClick={copyToClipboard}>
          Copy Text
        </button>
        <div
          className={styles.previewCard}
          style={{
            width:
              activeDevice === 1 ? "50%" : activeDevice === 2 ? "70%" : "90%",
          }}
        >
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <img
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            <div className={styles.profileDetails}>
              <div>Cody Fisher</div>
              <div>UI/Ux designer | Web Mobile Designer</div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                Now <FaEarthAmericas />
              </div>
            </div>
          </div>
          <div style={{padding:"15px 0px"}}>
          <span
            className={styles.post}
            dangerouslySetInnerHTML={{
              __html: isExpanded ? postData : truncatedContent,
            }}
          />
          {postData.length > 100 && (
            <span
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ cursor: "pointer", color: "gray", display: "inline" }} // Ensure inline display
            >
              {isExpanded ? "   see less" : "   ...see more"}
            </span>
          )}
          </div>

          <div className={styles.footer}>
            <div className={styles.impressionCount}>
              <div className={styles.like}>
                <BiLike className={styles.impressionIcon} /> 88
              </div>
              <div className={styles.commentsAndRepost}>
                <div>5 Comments</div>
                <div className={styles.dot}></div>
                <div>1 repost</div>
              </div>
            </div>
            <hr />
            <div className={styles.impressionList}>
              <div className={styles.impression}>
                <BiLike className={styles.impressionIcon} /> Like
              </div>
              <div className={styles.impression}>
                <BiCommentDetail className={styles.impressionIcon} /> Comments
              </div>
              <div className={styles.impression}>
                <FaShare className={styles.impressionIcon} /> Share
              </div>
              <div className={styles.impression}>
                <FiSend className={styles.impressionIcon} /> Send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
