import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState("");
  const navigate = useNavigate();
  const bearerToken = sessionStorage.getItem("bearer-token");
  const { setIsLoggedIn } = useAppContext();
  const backendBaseUrl = urlConfig.backendUrl || "http://localhost:3060";

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/app");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${backendBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken ? `Bearer ${bearerToken}` : "",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIncorrect(data.message || "Login failed");
        return;
      }

      const authToken = data.token || data.authtoken;
      if (authToken) {
        sessionStorage.setItem("auth-token", authToken);
        if (data.userName) sessionStorage.setItem("name", data.userName);
        if (data.userEmail) sessionStorage.setItem("email", data.userEmail);
        setIsLoggedIn(true);
        navigate("/app");
      } else {
        setIncorrect("Wrong credentials. Try again.");
      }
    } catch (e) {
      setIncorrect(e.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">
            Email
          </label>

          <input
            id="email"
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>

          <input
            id="password"
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <span className="login-error">{incorrect}</span>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="login-link">
          New here? <a href="/app/register">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
