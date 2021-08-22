import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.webp";

import { login, logout } from "../../service/auth.js";

import CustomButton from "../custom-button/custom-button.component";
import Profile from "../profile/profile.component";

import "./header.styles.scss";

const Header = () => {
  const [currentUser, setCurrentUser] = useState({});

  const signIn = async () => {
    const { user } = await login();
    if (user) {
      const { displayName, photoURL } = user;
      setCurrentUser({ displayName, photoURL });
    }
  };
  const signOut = async () => {
    await logout();
  };
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      {currentUser?.displayName && (
        <Profile
          userName={currentUser?.displayName}
          imgUrl={currentUser?.photoURL}
        />
      )}
      <div>
        {currentUser?.displayName ? (
          <CustomButton onClick={signOut} className="sign-button">
            Log out
          </CustomButton>
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
