import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import PostEditor from './PostEditor/PostEditor'
import Preview from './Preview/Preview';
import styles from './createpost.module.css';

const CreatePost = () => {
  const [postData, setPostData] = useState("Start typing here...");
  return (
    <div className={styles.createPostContainer}>
      <Navbar />
      <PostEditor postData={postData} setPostData={setPostData}/>
      <Preview postData={postData}/>
    </div>
  )
}

export default CreatePost