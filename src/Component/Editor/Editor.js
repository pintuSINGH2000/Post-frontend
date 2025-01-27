import React, { use, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosCopy } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";
import { FaStrikethrough } from "react-icons/fa6";
import styles from "./editor.module.css";
import { RiGeminiFill } from "react-icons/ri";
import {  OpenAI } from "openai";


const Editor = ({ onContentChange }) => {
  const editorRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [savedRange, setSavedRange] = useState(null);
  const [showAiMenu,setShowAiMenu] = useState(false);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedRange(range);
    }
  };

  const applyFormatting = (command) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, null);
    }
  };

  const copySelectedText = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      navigator.clipboard.writeText(selection.toString());
      alert("Text copied to clipboard!");
    }
  };


  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const fileType = file.type;
      const content = reader.result;
      if (editorRef.current) {
        editorRef.current.focus();
      if (fileType === "text/plain") {

        document.execCommand("insertText", false, content);
      } else {
        const link = `<a href="${content}" download="${file.name}" target="_blank">${file.name}</a>`;
        document.execCommand("insertHTML", false, link);
      }
    }
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imageHTML = `<img src="${reader.result}" alt="${file.name}" style="max-width: 100%; height: auto;" />`;
        if (editorRef.current) {
          const selection = window.getSelection();
          if (savedRange) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
            const range = selection.getRangeAt(0);
            range.deleteContents();
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = imageHTML;
            const frag = document.createDocumentFragment();
            let node, lastNode;
            while ((node = tempDiv.firstChild)) {
              lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            range.setStartAfter(lastNode);
            range.setEndAfter(lastNode);
            selection.removeAllRanges();
            selection.addRange(range);
            editorRef.current.focus();
            document.execCommand("insertHTML", false, imageHTML);
          }
          
      }
    };

    reader.readAsDataURL(file); // For images
  };

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    console.log(emoji);
    if (editorRef.current) {
      editorRef.current.focus();

      const selection = window.getSelection();
      if (savedRange) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
        const range = selection.getRangeAt(0);
        const emojiNode = document.createTextNode(emoji.emoji);
        range.deleteContents();
        range.insertNode(emojiNode);
        range.setStartAfter(emojiNode);
        range.setEndAfter(emojiNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setShowEmojiPicker(false);
    setSavedRange(null);
  };

  const handleInput = () => {
    const content = editorRef.current.innerHTML; // Get the editor's content (HTML)
    onContentChange(content); // Send updated content to the parent
  };

  const openai = new OpenAI({
    apiKey:"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", 
    dangerouslyAllowBrowser: true // Replace with your actual API key or environment variable
  });

  // Handle AI actions
  const handleAIAction = async (action) => {
    const content = editorRef.current.innerText.trim();
    if (!content) return;
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `${action} on ${content}` },
      ],
    });
    let generatedText = res.choices[0].message.content;
    editorRef.current.innerHTML = generatedText; 
    onContentChange(generatedText);
    setShowAiMenu(!showAiMenu);
  };
  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.formattingTools}>
          <button
            onClick={() => applyFormatting("bold")}
            className={styles.editorBtn}
          >
            <FaBold className={styles.toolbarIcon} title="bold"/>
          </button>
          <button
            onClick={() => applyFormatting("italic")}
            className={styles.editorBtn}
            title="italic"
          >
            <FaItalic className={styles.toolbarIcon} />
          </button>
          <button
            onClick={() => applyFormatting("strikeThrough")}
            className={styles.editorBtn}
            title="StrikeThrogh"
          >
            <FaStrikethrough className={styles.toolbarIcon} />
          </button>
          <BsEmojiSmile
            title="emoji"
            className={styles.toolbarIcon}
            id="emoji-open"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
            }}
            onClick={() => {
              handleEmojiModal();
            }}
          />
          {showEmojiPicker && (
            <div className={styles.emojipicker} ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
          <div className={styles.bar}></div>
          <div style={{ position: "relative" }}>
          <RiGeminiFill className={styles.toolbarIcon} onClick={()=>setShowAiMenu(!showAiMenu)}/>
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "0",
              background: "#fff",
              border: "1px solid #ddd",
              padding: "10px",
              display: showAiMenu?"block":"none",
            }}
            onMouseLeave={(e) => (e.target.style.display = "none")}
          >
            {["Summarize", "Rephrase", "Translate", "Simplify", "Emoji"].map(
              (tool) => (
                <div
                  key={tool}
                  onClick={() => handleAIAction(tool)}
                  style={{ display: "block", marginBottom: "5px", padding: "5px" }}
                >
                  {tool}
                </div>
              )
            )}
          </div>
        </div>
         
        </div>

        <div className={styles.fileTools}>
          <IoIosCopy
            onClick={copySelectedText}
            className={styles.toolbarIcon}
             title="copy"
          />
           <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="imageUpload"
          />
          <label htmlFor="imageUpload">
            <FaImage className={styles.toolbarIcon}  title="image"/>
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="fileUpload"
          />
          <label htmlFor="fileUpload">
            <MdAttachFile className={styles.toolbarIcon}  title="file"/>
          </label>
         
        </div>
      </div>
      <div
        className={styles.editor}
        contentEditable
        ref={editorRef}
        suppressContentEditableWarning={true}
        onInput={handleInput}
      >
        Start typing here...
      </div>
    </div>
  );
};

export default Editor;
