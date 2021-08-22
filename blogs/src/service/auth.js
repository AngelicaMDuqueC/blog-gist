import { firebase, githubProvider } from "../firebase/firebase.utils";

export const login = async () => {
  const res = await firebase.auth().signInWithPopup(githubProvider);
  const { credential, user } = res;
  const { accessToken: token } = credential;
  return { user, token };
};

export const logout = async () => {
  await firebase.auth().signOut();
};
