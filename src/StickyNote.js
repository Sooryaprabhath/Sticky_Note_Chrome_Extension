import React, { useState, useEffect, useRef } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BsDatabaseFillDown } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { AiOutlineSave } from "react-icons/ai";
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StickyNote = ({ note, onDelete, onContentChange }) => {
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef(null);
  const [noteHeight, setNoteHeight] = useState("auto");

  useEffect(() => {
    const storedContent = localStorage.getItem(note.id);
    if (storedContent) {
      setContent(storedContent);
    }
  }, [note.id]);

  useEffect(() => {
    // Update content in localStorage whenever it changes
    localStorage.setItem(note.id, content);
    onContentChange(note.id, content);
  }, [content, note.id, onContentChange]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setNoteHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [content]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleReset = () => {
    setContent("");
    setNoteHeight("150px");
    localStorage.removeItem(note.id);
    toast.success("Note reset successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Content copied to clipboard!");
    });
  };

  const handleSave = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      localStorage.setItem(`${user.uid}_note_${note.id}`, content);  // Store in localStorage under the user's UID
      toast.success("Note saved locally!");
    } else {
      toast.error("User not logged in.");
    }
  };

  const handleDelete = () => {
    localStorage.removeItem(note.id);
    onDelete(note.id); // Call parent onDelete function to remove note
    toast.success("Note deleted locally!");
  };

  const handleRetrieve = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const savedContent = localStorage.getItem(`${user.uid}_note_${note.id}`);
      if (savedContent) {
        setContent(savedContent);
        toast.success("Note retrieved from local storage!");
      } else {
        toast.error("No saved note found.");
      }
    } else {
      toast.error("User not logged in.");
    }
  };

  const stickyNoteStyle = {
    backgroundColor: "#FFF9C4",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    width: "300px",
    minHeight: "150px",
    marginBottom: "20px",
    position: "relative",
    fontFamily: `'Roboto', sans-serif`,
    overflow: "hidden",
  };

  const textareaStyle = {
    width: "100%",
    height: noteHeight,
    padding: "10px",
    border: "none",
    outline: "none",
    resize: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    color: "#333",
  };

  const buttonBaseStyle = {
    padding: 6,
    paddingTop: 8,
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s",
    marginRight: "10px",
  };

  const saveButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#4cc777",
  };

  const resetButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#f5cd2a",
  };

  const copyButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#2192de",
  };

  const deleteButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#e35959",
  };

  const retrieveButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#9c27b0", // Purple for retrieve
  };

  return (
    <div style={stickyNoteStyle}>
      <textarea
        ref={textareaRef}
        style={textareaStyle}
        value={content}
        onChange={handleChange}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
        }}
      >
        <div>
          <button
            style={copyButtonStyle}
            onClick={handleCopy}
            title="Copy Content"
          >
            <FaCopy size={18} />
          </button>
          <button
            style={resetButtonStyle}
            onClick={handleReset}
            title="Reset Note"
          >
            <GrPowerReset size={18} />
          </button>
          <button
            style={deleteButtonStyle}
            onClick={handleDelete}
            title="Delete Note"
          >
            <MdDelete size={18} />
          </button>
        </div>
        <div>
          <button
            style={saveButtonStyle}
            onClick={handleSave}
            title="Save Note"
          >
            <AiOutlineSave size={18} />
          </button>
          <button
            style={retrieveButtonStyle}
            onClick={handleRetrieve}
            title="Retrieve Note"
          >
            <BsDatabaseFillDown size={18} />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StickyNote;
