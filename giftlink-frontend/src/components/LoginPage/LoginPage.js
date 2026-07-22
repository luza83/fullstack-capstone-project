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
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-card p-4 border rounded">
            <h2 className="login-title">Login</h2>

            <form className="login-form" onSubmit={handleLogin}>
              <label className="login-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="login-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
              />

              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="login-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />
              <span
                style={{
                  color: "red",
                  height: ".5cm",
                  display: "block",
                  fontStyle: "italic",
                  fontSize: "12px",
                }}
              >
                {incorrect}
              </span>

              <button className="login-btn" type="submit">
                Login
              </button>
            </form>

            <p className="login-link">
              New here? <a href="/app/register">Register Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
