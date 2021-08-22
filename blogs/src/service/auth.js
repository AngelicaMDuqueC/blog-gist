import { firebase, githubProvider } from "../firebase/firebase.utils";

export const login = async () => {
  const res = await firebase.auth().signInWithPopup(githubProvider);
  const { credential, user, additionalUserInfo } = res;
  const { accessToken: token } = credential;
  const { displayName, photoURL } = user;
  const { username } = additionalUserInfo;
  return { token, user: { displayName, photoURL, username } };
};

export const logout = async () => {
  await firebase.auth().signOut();
};
