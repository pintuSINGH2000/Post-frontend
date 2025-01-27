import React, { useMemo, useState } from "react";
import styles from "./posteditor.module.css";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { FaTachometerAlt } from "react-icons/fa";
import { RiExpandUpDownLine } from "react-icons/ri";
import Editor from "../../Editor/Editor";
import { BiSolidCalendarAlt } from "react-icons/bi";
import { IoSend } from "react-icons/io5";

const PostEditor = ({ postData, setPostData }) => {
  const onContentChange = (content) => {
    setPostData(content);
  };

  return (
    <div className={styles.container}>
      <div className={styles.postHeader}>
        <h2>Write Post</h2>
        <div className={styles.rightHeader}>
          <button className={styles.scoreBtn}>
            <FaTachometerAlt style={{ fontSize: "16px" }} />
            Check Score
          </button>
          <div className={styles.bar}></div>
          <div className={styles.userProfile}>
            <div className={styles.profileImg}>
              <img
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            <RiExpandUpDownLine />
          </div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Editor onContentChange={onContentChange} />
      </div>

      <div className={styles.postFooter}>
        <div className={styles.footerTexts}>
          <div className={styles.footerText}>
            Last saved at oct 4,2023, 10:34 AM
          </div>
          <div className={styles.footerText}>
            {postData?.length ? postData.length : 0} character
          </div>
        </div>
        <hr />
        <div className={styles.footerBtns}>
          <button className={styles.footerBtn}>Save as Draft</button>
          <div className={styles.rightBtns}>
            <button className={styles.footerBtn}>
              <BiSolidCalendarAlt className={styles.btnIcon} />
              Shedule
            </button>
            <button
              style={{ backgroundColor: "blue", color: "white" }}
              className={styles.footerBtn}
            >
              Publish <IoSend className={styles.btnIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
