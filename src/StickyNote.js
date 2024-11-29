import React, { useState, useEffect, useRef } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa"; // Icon for the Copy button
import { AiOutlineSave } from "react-icons/ai"; // Icon for the Save button
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const StickyNote = ({ note, onDelete, onContentChange }) => {
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef(null);
  const [noteHeight, setNoteHeight] = useState("auto");

  // Retrieve content from localStorage if available
  useEffect(() => {
    const storedContent = localStorage.getItem(note.id);
    if (storedContent) {
      setContent(storedContent);
    }
  }, [note.id]);

  // Update parent and store content in localStorage when content changes
  useEffect(() => {
    onContentChange(note.id, content);
  }, [content, note.id, onContentChange]);

  // Auto resize textarea height based on content
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
    setContent(""); // Reset content
    setNoteHeight("150px"); // Reset to initial height
    localStorage.removeItem(note.id); // Remove content from localStorage
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert("Content copied to clipboard!");
    });
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "notes", note.id), {
        content,
        timestamp: new Date(),
      });
      alert("Note saved to Firestore!");
    } catch (error) {
      console.error("Error saving note to Firestore:", error);
      alert("Failed to save note.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "notes", note.id));
      onDelete(note.id);
      alert("Note deleted from Firestore!");
    } catch (error) {
      console.error("Error deleting note from Firestore:", error);
      alert("Failed to delete note.");
    }
  };

  const stickyNoteStyle = {
    backgroundColor: "#FFF9C4",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    width: "300px",
    minHeight: "150px", // Initial height
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

  const buttonStyle = {
    padding: "8px",
    paddingTop: "10px",
    backgroundColor: "#FF6F61",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s",
    marginRight: "10px",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#F4A261",
  };

  const saveButtonHoverStyle = {
    backgroundColor: "#E76F51",
  };

  return (
    <div style={stickyNoteStyle}>
      <textarea
        ref={textareaRef}
        style={textareaStyle}
        value={content}
        onChange={handleChange}
      />
      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <button
          style={saveButtonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              saveButtonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              saveButtonStyle.backgroundColor)
          }
          onClick={handleSave}
        >
          <AiOutlineSave size={20} />
        </button>
        <button style={buttonStyle} onClick={handleReset}>
          <GrPowerReset size={20} />
        </button>
        <button style={buttonStyle} onClick={handleCopy}>
          <FaCopy size={20} />
        </button>
        <button style={buttonStyle} onClick={handleDelete}>
          <MdDelete size={20} />
        </button>

        {/* <button
          style={buttonStyle}
          onClick={() => onDelete(note.id)}
        >
          <MdDelete size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default StickyNote;
