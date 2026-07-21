import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login clicked", { email, password });
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
