import React, { useState } from "react";

function SignUp({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (username && password) {
      console.log("User signed up:", { username, password });
      localStorage.setItem("user", JSON.stringify({ username, password }));
      onSwitchToLogin(); // Redirect to Login
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSignUp} style={styles.button}>
        Sign Up
      </button>
      <p style={styles.linkText}>
        Already have an account?{" "}
        <span onClick={onSwitchToLogin} style={styles.link}>
          Login
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  linkText: {
    marginTop: "10px",
    color: "#555",
    fontSize: "14px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default SignUp;
