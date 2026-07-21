import React, { useState } from "react";

import "./RegisterPage.css";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Register clicked", { firstName, lastName, email, password });
  };

  return (
    <div className="register-page">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="register-card p-4 border rounded">
            <h2 className="register-title">Register</h2>

            <form className="register-form" onSubmit={handleRegister}>
              <label className="register-label" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                className="register-input"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter first name"
              />

              <label className="register-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                className="register-input"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter last name"
              />

              <label className="register-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="register-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
              />

              <label className="register-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="register-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />

              <button className="register-btn" type="submit">
                Register
              </button>
            </form>

            <p className="register-link">
              Already a member? <a href="/app/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
