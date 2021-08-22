/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Title from "../../components/title/title.component";
import Text from "../../components/text/text.component";
import Search from "../../components/search/search.component";
import Result from "../../components/result/result.component";

import "./searchPage.styles.scss";

const SearchPage = () => {
  const titleBlog = "Blog msc";
  const textDefault =
    "Explore the unknown. Uncover what matters. Prototype, test, repeat. Combine intuition with evidence. Design with intent and build it right.";
  const [hasResult, setHasResult] = useState(false);
  return (
    <div className="searchPage">
      <Title>{titleBlog}</Title>
      <Text>{textDefault}</Text>
      <Search />
      {hasResult && <Result />}
    </div>
  );
};

export default SearchPage;
