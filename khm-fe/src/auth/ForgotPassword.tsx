import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CiLock } from "react-icons/ci";
import { PiUser } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { companyDetails } from "../assets/Assets";

import "./../styles/auth.scss";
import { MdOutlineMailOutline } from "react-icons/md";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLogginIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setLoginError("Account does not exist. Please try again");
      return;
    }

    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch(
        "https://ejarealestate.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successfully: ", data);
        localStorage.setItem("authToken", data.token);
        setLoginError("");
        navigate("/admin"); // Use navigate to redirect
      } else {
        setLoginError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <div className="auth">
        <div className="login">
          <div className="row">
            <div className="left">
              <div className="content">
                <h2>{companyDetails.name}</h2>
                <p>The best and fastest way to own the property.</p>
              </div>
            </div>

            <div className="right">
              <div className="lan-container">
                <div className="content">
                  <Link to={"/"} className="logo">
                    <img src={companyDetails.logo} />
                  </Link>
                  <div className="form">
                    <div className="title">
                      <h2>Register</h2>
                      <p>Enter your credentials below!</p>
                    </div>
                    <form className="inputs" onSubmit={handleLoginSubmit}>
                      <div className="input">
                        <div className="icon">
                          <MdOutlineMailOutline />
                        </div>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          placeholder="Email"
                          onChange={handleUsernameChange}
                          required
                        />
                      </div>
                      <div className="forgot">
                        <Link></Link>
                        <Link to={"/auth/login"}>Back to Login</Link>
                      </div>
                      <div className="button">
                        <button type="submit" disabled={isLogginIn}>
                          {isLogginIn ? "Sending Code..." : "Reset Password"}
                        </button>
                      </div>
                      <div className="errors">
                        {loginError && <p>{loginError}</p>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
