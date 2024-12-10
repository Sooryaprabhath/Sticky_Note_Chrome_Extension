import React, { useState } from "react";

function Login({ onLoginSuccess, onSwitchToSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      onLoginSuccess({ username });
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
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
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      <p style={styles.linkText}>
        Don’t have an account?{" "}
        <span onClick={onSwitchToSignUp} style={styles.link}>
          Sign Up
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

export default Login;
