import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      console.log({ password });
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed");
        return;
      }

      const { token, userID } = await response.json();

      // Store the token securely (e.g., in localStorage)
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userID", userID);
      // Set the loggedIn state to true
      setLoggedIn(true);
      setSuccessMessage("Register successful!");
      // Redirect to the main ToDo page
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Internal Server Error");
    }
    // Email validation rule
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation rule
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    // Validate email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return; // Stop registration if email is not valid
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      alert(
        "Password must have at least 8 characters, one capital letter, and one special character."
      );
      return; // Stop registration if password is not valid
    }

    // Continue with registration
    // Call the handleRegister function from prop if needed
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "410px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
        marginTop: "10%",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Registration Page</h2>
      <div style={{ marginBottom: "10px", width: "100%" }}>
        <label style={{ marginRight: "10px" }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            flex: "1",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginLeft: "30px",
            width: "280px",
            color: "black", // Set text color to black
          }}
        />
      </div>
      <div style={{ marginBottom: "10px", width: "100%" }}>
        <label style={{ marginRight: "10px" }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            flex: "1",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginLeft: "35px",
            width: "280px",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px", width: "100%" }}>
        <label style={{ marginRight: "10px" }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{
            flex: "1",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginLeft: "8px",
            width: "280px",
            color: "black", // Set text color to black
          }}
        />
      </div>
      <button
        style={{
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleRegistration}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
