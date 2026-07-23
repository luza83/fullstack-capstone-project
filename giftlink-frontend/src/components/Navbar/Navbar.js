import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    const authTokenFromSession = sessionStorage.getItem("auth-token");
    const nameFromSession = sessionStorage.getItem("name");
    if (authTokenFromSession) {
      if (isLoggedIn && nameFromSession) {
        setUserName(nameFromSession);
      } else {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn, setIsLoggedIn, setUserName]);
  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate(`/app`);
  };
  const profileSecton = () => {
    navigate(`/app/profile`);
  };
return (
  <nav className="navbar navbar-expand-lg" id="navbar_container">
   <a className="nav-link" href="/home.html" title="Home">
      <i className="fas fa-gift brand-icon"></i>
      <span className="brand-gift">Gift</span>
      <span className="brand-link">Link</span>
    </a>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div
      className="collapse navbar-collapse justify-content-between"
      id="navbarNav"
    >
      <ul className="navbar-nav mx-auto">

        <li className="nav-item">
          <a className="nav-link" href="/home.html" title="Home">
            <i className="fas fa-home"></i>
            <span> Home</span>
          </a>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/app">
            <i className="fas fa-gifts"></i>
            <span> Gifts</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/app/search">
            <i className="fas fa-search"></i>
            <span> Search</span>
          </Link>
        </li>

      </ul>

      <ul className="navbar-nav align-items-center">

        {isLoggedIn ? (
          <>
            <li className="nav-item me-3">
              <span
                className="nav-link welcome-user"
                onClick={profileSecton}
              >
                <i className="fas fa-user-circle"></i>
                {" "}
                {userName}
              </span>
            </li>

            <li className="nav-item">
              <button
                className="nav-link logout-btn"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                {" "}
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link auth-nav-btn" to="/app/login">
                <i className="fas fa-sign-in-alt"></i>
                {" "}
                Login
              </Link>
            </li>

            <li className="nav-item ms-2">
              <Link className="nav-link auth-nav-btn" to="/app/register">
                <i className="fas fa-user-plus"></i>
                {" "}
                Register
              </Link>
            </li>
          </>
        )}

      </ul>
    </div>
  </nav>
);
}
