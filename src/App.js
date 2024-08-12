import React from "react";
import NotesContainer from "./NotesContainer";

function App() {
  const appStyle = {
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "22px",
    // marginLeft: '5px',
  };

  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>Sticky Notes</h1>
      <NotesContainer />
    </div>
  );
}

export default App;
