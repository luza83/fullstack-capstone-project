import React, { useState } from "react";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const backendBaseUrl = urlConfig.backendUrl || "http://localhost:3060";

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${backendBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      const data = await response.json();
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", data.authtoken);
        sessionStorage.setItem("name", firstName);
        sessionStorage.setItem("email", json.email);
        setIsLoggedIn(true);
        navigate("/app");
      }
    } catch (error) {
      setShowerr(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>

        <form className="register-form" onSubmit={handleRegister}>
          <label className="register-label" htmlFor="firstName">
            First Name
          </label>

          <input
            id="firstName"
            className="register-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />

          <label className="register-label" htmlFor="lastName">
            Last Name
          </label>

          <input
            id="lastName"
            className="register-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />

          <label className="register-label" htmlFor="email">
            Email
          </label>

          <input
            id="email"
            className="register-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label className="register-label" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            className="register-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <a href="/app/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
