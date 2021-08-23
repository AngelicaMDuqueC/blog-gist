/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import Profile from "../profile/profile.component";

import ArticleLabel from "../article-label/article-label.component";

import { useUser } from "../../context/user-context/user.context";

import "./result.styles.scss";

const Result = () => {
  const {
    user: { gists, searchUsername, searchdisplayName, searchphotoURL },
  } = useUser();
  return (
    <article>
      <Profile userName={searchdisplayName} imgUrl={searchphotoURL}></Profile>
      <aside>
        <ul>
          {gists.length ? (
            gists.map((article) => {
              const { id, file, updated_at } = article;

              return (
                <ArticleLabel
                  key={id}
                  articleName={file}
                  updateDate={updated_at}
                />
              );
            })
          ) : (
            <span className="empty-message">Your Search is empty</span>
          )}
        </ul>
      </aside>
    </article>
  );
};

export default Result;
