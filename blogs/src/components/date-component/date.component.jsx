/* eslint-disable react/prop-types */
import React from "react";

import "./date.styles.scss";

const DateLabel = ({ updateDate }) => {
  return <span>{updateDate}</span>;
};

DateLabel.propTypes = {};

export default DateLabel;
