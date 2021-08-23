/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

import "./profile.styles.scss";

const Profile = ({ userName, imgUrl, post = false }) => {
  const displayName = true;
  return (
    <aside className="profile">
      <picture>
        <img src={imgUrl} alt={userName}></img>
      </picture>
      {displayName && <h3>{userName}</h3>}
      {post && <Link to="/article">Posts</Link>}
    </aside>
  );
};

export default Profile;
