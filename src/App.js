/**
 * Copyright 2024 Sooryaprabhath
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect } from "react";
import NotesContainer from "./NotesContainer";
import Login from "./Login";
import SignUp from "./SignUp"; // Import the SignUp component
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false); // Track if on the SignUp page

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const userNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      setNotes(userNotes);
    }
  }, [isAuthenticated]);

  const appStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    minHeight: "40vh",
    padding: "20px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const handleLoginSuccess = (user) => {
    console.log("Logged in as:", user.username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNotes([]);
  };

  const switchToSignUp = () => {
    setIsSignUpPage(true);
  };

  const switchToLogin = () => {
    setIsSignUpPage(false);
  };

  return (
    <div style={appStyle}>
      {!isAuthenticated ? (
        isSignUpPage ? (
          <SignUp onSwitchToLogin={switchToLogin} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignUp={switchToSignUp} />
        )
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={toggleTheme}
              style={{
                marginLeft: "auto",
                padding: "8px",
                borderRadius: "50%",
                border: "none",
                width: "40px",
                height: "40px",
                backgroundColor: isDarkMode ? "#FFD700" : "#4CAF50",
                color: isDarkMode ? "#000" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isDarkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                padding: "8px",
                borderRadius: "50%",
                border: "none",
                width: "40px",
                height: "40px",
                backgroundColor: "#e35959",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <BiLogOut size={25} />
            </button>
          </div>
          <NotesContainer notes={notes} />
        </div>
      )}
    </div>
  );
}

export default App;
