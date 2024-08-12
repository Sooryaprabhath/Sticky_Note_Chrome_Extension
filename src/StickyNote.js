import React, { useState, useEffect, useRef } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const StickyNote = ({ note, onDelete, onContentChange }) => {
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef(null);
  const [noteHeight, setNoteHeight] = useState("auto");

  // Update parent when content changes
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
  };

  const buttonHoverStyle = {
    backgroundColor: "#FF3D00",
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498DB",
    marginRight: "10px",
  };

  const resetButtonHoverStyle = {
    backgroundColor: "#2980B9",
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
          style={resetButtonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              resetButtonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              resetButtonStyle.backgroundColor)
          }
          onClick={handleReset}
        >
          <GrPowerReset size={20} />
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor)
          }
          onClick={() => onDelete(note.id)}
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default StickyNote;
