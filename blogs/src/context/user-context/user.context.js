import { createContext, useReducer, useContext } from "react";

const UserInitialState = {
  username: "",
  displayName: "",
  photoURL: "",
  token: "",
};

function UserReducer(state, action) {
  const { type, user } = action;
  switch (type) {
    case "CHANGE-USER": {
      return { ...state, username: user };
    }
    case "USER-LOGIN": {
      return {
        ...state,
        ...user,
      };
    }
    case "USER-LOGOUT": {
      return {
        ...UserInitialState,
        username: state.username,
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
  return (
    <UserContext.Provider
      value={{ user, changeUsername, userLogin, userLogout }}
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
