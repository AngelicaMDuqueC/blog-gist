import { createContext, useReducer, useContext } from "react";

const UserInitialState = {
  username: "",
  displayName: "",
  photoURL: "",
  token: "",
  searchUsername: "",
  searchdisplayName: "",
  searchphotoURL: "",
  validSearch: false,
  gists: [],
};

function UserReducer(state, action) {
  const { type, user } = action;
  switch (type) {
    case "CHANGE-USER": {
      return {
        ...state,
        searchUsername: user,
        searchdisplayName: "",
        searchphotoURL: "",
      };
    }
    case "USER-LOGIN": {
      return {
        ...state,
        ...user,
        username: state.searchUsername,
      };
    }
    case "USER-LOGOUT": {
      return {
        ...UserInitialState,
        searchUsername: state.username,
      };
    }
    case "UPDATE-GISTS": {
      return {
        ...state,
        gists: user,
      };
    }
    case "UPDATE-SEARCH-RESULT": {
      const { gists, searchedUser, validSearch } = user;
      return {
        ...state,
        gists,
        ...searchedUser,
        validSearch,
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}

const UserActions = {
  changeUsername(username) {
    return {
      type: "CHANGE-USER",
      user: username,
    };
  },
  login(user) {
    return {
      type: "USER-LOGIN",
      user,
    };
  },
  logout() {
    return {
      type: "USER-LOGOUT",
    };
  },
  updateGists(gists) {
    return {
      type: "UPDATE-GISTS",
      user: gists,
    };
  },
  searchGists(gists, searchedUser, validSearch) {
    return {
      type: "UPDATE-SEARCH-RESULT",
      user: { gists, searchedUser, validSearch },
    };
  },
};

const UserContext = createContext();

function UserProvider(props) {
  const [user, userDispatch] = useReducer(UserReducer, UserInitialState);

  const changeUsername = (username) => {
    userDispatch(UserActions.changeUsername(username));
  };

  const userLogin = (user) => {
    userDispatch(UserActions.login(user));
  };

  const userLogout = () => {
    userDispatch(UserActions.logout());
  };

  const updateGists = (gists) => {
    userDispatch(UserActions.updateGists(gists));
  };
  const searchGists = (gists, searchedUser, validSearch) => {
    userDispatch(UserActions.searchGists(gists, searchedUser, validSearch));
  };
  return (
    <UserContext.Provider
      value={{
        user,
        changeUsername,
        userLogin,
        userLogout,
        updateGists,
        searchGists,
      }}
      {...props}
    />
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
