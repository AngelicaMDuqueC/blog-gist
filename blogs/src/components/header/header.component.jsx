import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.webp";

import { useUser } from "../../context/user-context/user.context";

import { login, logout } from "../../service/auth.js";

import CustomButton from "../custom-button/custom-button.component";
import Profile from "../profile/profile.component";

import "./header.styles.scss";

const Header = () => {
  const { user, userLogin, userLogout } = useUser();
  const signIn = async () => {
    const { token, userData } = await login();
    userLogin({ token, ...userData });
  };
  const signOut = async () => {
    await logout();
    userLogout();
  };
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      {user?.displayName && (
        <Profile userName={user?.displayName} imgUrl={user?.photoURL} />
      )}
      <div>
        {user?.displayName ? (
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
