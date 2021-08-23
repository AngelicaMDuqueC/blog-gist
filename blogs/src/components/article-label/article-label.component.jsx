/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import { Link } from "react-router-dom";

import DateLabel from "../date-component/date.component";

import "./article-label.styles.scss";

const ArticleLabel = ({ articleName, updateDate }) => {
  return (
    <li>
      <DateLabel updateDate />
      <h4>{articleName}</h4>
      <Link to="/article">Read</Link>
    </li>
  );
};

ArticleLabel.propTypes = {};

export default ArticleLabel;
