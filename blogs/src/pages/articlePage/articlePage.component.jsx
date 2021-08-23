/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { useParams } from "react-router-dom";

import Title from "../../components/title/title.component";
import Text from "../../components/text/text.component";
import Search from "../../components/search/search.component";
import Result from "../../components/result/result.component";
import Background from "../../components/background/background.component";
import Profile from "../../components/profile/profile.component";

import "./articlePage.styles.scss";

const ArticlePage = () => {
  let { topicId } = useParams();

  return (
    <div className="articlePage">
      <section className="search-content">
        {/* <Title>{mockResult.file}</Title>
        <Text>{mockResult.summary}</Text> */}
        <Profile></Profile>
      </section>
      <Background />
    </div>
  );
};

export default ArticlePage;
