// src/components/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log({ password });
  }, [password]);

  const handleLogin = async () => {
    try {
      console.log({ password });
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Login failed");
        return;
      }

      const { token, userID } = await response.json();

      // Store the token securely (e.g., in localStorage)
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userID", userID);
      // Set the loggedIn state to true
      setLoggedIn(true);
      setSuccessMessage("Login successful!");
      // Redirect to the main ToDo page
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Internal Server Error");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("data:image/jpeg;base64,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")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
          marginTop: "15%",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Login</h1>
        <input
          type="text"
          placeholder="Email"
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <button
            style={{
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "5px",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
          <Link to="/register">
            <button
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              Register
            </button>
          </Link>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
