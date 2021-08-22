import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIWTQ7Nyof79nVVLdkJU7t6VkGpVHxut0",
  authDomain: "bloggist-1ab08.firebaseapp.com",
  projectId: "bloggist-1ab08",
  storageBucket: "bloggist-1ab08.appspot.com",
  messagingSenderId: "820352772826",
  appId: "1:820352772826:web:2ab5a9e8a02bd93b3f53e3",
};

firebase.initializeApp(firebaseConfig);

const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope("gist");

export { firebase, githubProvider };
