import React from "react";

const PremiumFeaturesPage = () => {
  const pageStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const buttonStyle = {
    display: "block",
    margin: "0 auto",
    padding: "12px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Premium Features</h1>
      <div style={sectionStyle}>
        <h2>Features:</h2>
        <ul>
          <li>Unlimited Sticky Notes</li>
          <li>No Word Limit</li>
          <li>Access to All Future Updates</li>
          <li>Priority Customer Support</li>
        </ul>
      </div>
      <div style={sectionStyle}>
        <h2>About Sticky Notes:</h2>
        <p>
          With the premium version, you can create as many sticky notes as you
          need without any restrictions. Customize your notes, organize your
          tasks, and never worry about running out of space.
        </p>
      </div>
      <button style={buttonStyle} onClick={() => alert("Redirect to Payment")}>
        Buy Premium Now
      </button>
    </div>
  );
};

export default PremiumFeaturesPage;
