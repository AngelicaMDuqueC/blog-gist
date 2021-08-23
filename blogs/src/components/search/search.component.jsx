import React from "react";

import { useUser } from "../../context/user-context/user.context";
import { fetchGists } from "../../utils/crud-actions";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./search.styles.scss";

const SearchForm = () => {
  const { user, searchGists, changeUsername } = useUser();

  const onSummit = async (evt) => {
    evt.preventDefault();
    const { searchUsername, token } = user;
    const { allGistsData, searchedUser, validSearch } = await fetchGists(
      searchUsername,
      token
    );
    console.log("final", { allGistsData, searchedUser, validSearch });
    searchGists(allGistsData, searchedUser, validSearch);
  };

  return (
    <form onSubmit={onSummit}>
      <FormInput
        value={user?.searchUsername}
        onChange={(e) => changeUsername(e.target.value)}
        type="text"
        placeholder="Search blog posts"
        name="searchUser"
      />
      <CustomButton
        type="submit"
        disabled={!user?.searchUsername}
        className="search-button"
      >
        Search
      </CustomButton>
    </form>
  );
};

export default SearchForm;
