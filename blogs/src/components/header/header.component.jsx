import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.webp";

import { login, logout } from "../../service/auth.js";

import CustomButton from "../custom-button/custom-button.component";

import "./header.styles.scss";

const Header = () => {
  const currentUser = null;
  const signIn = async () => {
    const { token, user } = await login();
    console.log(user, token);
  };
  const signOut = async () => {
    await logout();
  };
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div>
        {currentUser ? (
          <CustomButton onClick={signOut}>LOG OUT</CustomButton>
        ) : (
          <CustomButton onClick={signIn} className="sign-button">
            Sign in
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default Header;
