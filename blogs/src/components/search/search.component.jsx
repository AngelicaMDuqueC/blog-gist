import React from "react";

import { useUser } from "../../context/user-context/user.context";

import FromInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./search.styles.scss";

const SearchForm = () => {
  const { user, changeUsername } = useUser();
  const onSummit = (evt) => {
    evt.preventDefault();
    console.log(user);
  };

  return (
    <form onSubmit={onSummit}>
      <FromInput
        value={user.username}
        onInput={(e) => changeUsername(e.target.value)}
        type="text"
        placeholder="Search blog posts"
        name="searchUser"
      />
      <CustomButton
        type="submit"
        disabled={!user.username}
        className="search-button"
      >
        Search
      </CustomButton>
    </form>
  );
};

export default SearchForm;
