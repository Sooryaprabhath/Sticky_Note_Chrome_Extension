import React, { useState } from "react";
import NotesContainer from "./NotesContainer";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const appStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    minHeight: "40vh",
    padding: "20px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const headingStyle = {
    fontSize: "22px",
    marginRight: "auto",
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? "#555" : "#ddd",
    color: isDarkMode ? "#fff" : "#000",
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={appStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={headingStyle}>
          Sticky Notes{" "}
          <sup style={{ fontSize: 11, color: "#525252" }}>Beta</sup>
        </h1>
        <button style={buttonStyle} onClick={toggleTheme}>
          {isDarkMode ? (
            <MdOutlineDarkMode size={20} />
          ) : (
            <MdDarkMode size={20} />
          )}
        </button>
      </div>
      <NotesContainer />
    </div>
  );
}

export default App;
