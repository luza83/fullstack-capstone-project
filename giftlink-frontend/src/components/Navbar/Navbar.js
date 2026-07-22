import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";
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
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        id="navbar_container"
      >
        <a
          className="navbar-brand theme-brand"
          href={`${urlConfig.backendUrl}/app`}
        >
          GiftLink
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="/home.html" title="Home">
                🏠
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app" title="Gifts">
                🎁
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app/search" title="Search">
                🔍
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={profileSecton}
                  >
                    Welcome, {userName}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link auth-nav-btn" to="/app/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link auth-nav-btn" to="/app/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
