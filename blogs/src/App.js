import React from "react";
import { Switch, Route } from "react-router-dom";

import { UserProvider } from "./context/user-context/user.context";

import Header from "./components/header/header.component";

import SearchPage from "./pages/searchPage/searchPage.component";
import ArticlePage from "./pages/articlePage/articlePage.component.jsx";
import NewEntryPage from "./pages/newEntryPage/newEntryPage.component.jsx";

import "./App.css";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/article/:topicId" component={ArticlePage} />
          <Route exact path="/new" component={NewEntryPage} />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
