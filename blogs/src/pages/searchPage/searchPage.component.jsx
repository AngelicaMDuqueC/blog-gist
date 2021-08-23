/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Title from "../../components/title/title.component";
import Text from "../../components/text/text.component";
import Search from "../../components/search/search.component";
import Result from "../../components/result/result.component";
import Background from "../../components/background/background.component";

import { useUser } from "../../context/user-context/user.context";

import "./searchPage.styles.scss";

const SearchPage = () => {
  const titleBlog = "Blog msc";
  const textDefault =
    "Explore the unknown. Uncover what matters. Prototype, test, repeat. Combine intuition with evidence. Design with intent and build it right.";
  const {
    user: { gists },
  } = useUser();

  return (
    <div className="searchPage">
      <section className="search-content">
        <Title>{titleBlog}</Title>
        <Text>{textDefault}</Text>
        <Search />
        {gists.length && <Result />}
      </section>
      <Background className="background-home" />
    </div>
  );
};

export default SearchPage;
