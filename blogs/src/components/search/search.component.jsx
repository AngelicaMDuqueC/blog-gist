import React, { useState } from "react";

import FromInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./search.styles.scss";

const SearchForm = () => {
  const [username, setUsername] = useState("");
  const onSummit = (evt) => {
    evt.preventDefault();
    console.log(username);
  };

  return (
    <form onSubmit={onSummit}>
      <FromInput
        value={username}
        onInput={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Search blog posts"
        name="searchUser"
      />
      <CustomButton type="submit" disabled={!username}>
        Search
      </CustomButton>
    </form>
  );
};

export default SearchForm;
