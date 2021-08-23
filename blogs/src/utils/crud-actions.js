import { firebase, githubProvider } from "../firebase/firebase.utils";
import { Octokit } from "@octokit/core";
import { getGistData, getGistFileData } from "./index";

const BASE_URL = "https://api.github.com";

const fetchAllGists = async (user, token) => {
  const url = `${BASE_URL}/users/${user}/gists`;
  const { res, exists } = await getUser(user);
  if (exists) {
    const {
      data: {
        avatar_url: searchphotoURL = "",
        name: searchdisplayName = "",
        login: searchUsername = "",
      },
    } = res;
    if (!token) {
      try {
        const resp = await fetch(url);
        if (resp.status === 200)
          return {
            rawGists: await resp.json(),
            searchedUser: { searchUsername, searchdisplayName, searchphotoURL },
            validSearch: true,
          };
        return { rawGists: [], searchedUser: {}, validSearch: false };
      } catch (error) {
        console.error(`Cant fetch data from ${url}`);
        return { rawGists: [], searchedUser: {}, validSearch: false };
      }
    } else {
      const octokit = new Octokit({ auth: token });
      const { data } = await octokit.request(`GET /users/${user}/gists`, {
        username: user,
      });
      return {
        rawGists: data,
        searchedUser: { searchUsername, searchdisplayName, searchphotoURL },
        validSearch: true,
      };
    }
  } else {
    return {
      rawGists: [],
      searchedUser: {},
      validSearch: false,
    };
  }
};

export const fetchGists = async (user, token) => {
  const { rawGists, searchedUser, validSearch } = await fetchAllGists(
    user,
    token
  );
  const allGists = rawGists.map((gist) => getGistData({ data: gist }));
  const gistsData = allGists.reduce((acc, curr) => {
    curr.type === "text/markdown" && acc.push(curr);
    return acc;
  }, []);
  const allGistsData = await Promise.all(
    gistsData.map(async (gist) => {
      const { content, summary } = await getGistFileData(gist);
      return { ...gist, content, summary };
    })
  );

  return { allGistsData, searchedUser, validSearch };
};

export const login = async () => {
  const res = await firebase.auth().signInWithPopup(githubProvider);
  const { credential, user, additionalUserInfo } = res;
  const { displayName, photoURL } = user;
  const { username } = additionalUserInfo;
  const { accessToken: token } = credential;
  return { token, user: { username, displayName, photoURL } };
};

export const logout = async () => {
  await firebase.auth().signOut();
};

export const createGist = async (token, data) => {
  const octokit = new Octokit({ auth: token });
  const { description, filename, content } = data;
  return await octokit.request("POST /gists", {
    description,
    files: {
      [filename]: {
        content: content,
      },
    },
    public: true,
  });
};

export const updateGist = async (token, gist) => {
  const octokit = new Octokit({ auth: token });
  return await octokit.request(`PATCH /gists/${gist.id}`, {
    gist_id: gist.id,
    description: gist.description,
    files: {
      [gist.file]: {
        content: gist.content,
      },
    },
  });
};

export const deleteGist = async (token, gist_id) => {
  const octokit = new Octokit({ auth: token });
  return await octokit.request(`DELETE /gists/${gist_id}`, {
    gist_id,
  });
};

export const getUser = async (username) => {
  const octokit = new Octokit();
  try {
    const res = await octokit.request(`GET /users/{username}`, {
      username,
    });
    if (res.status === 200) return { res, exists: true };
    return { res: {}, exists: false };
  } catch (error) {
    console.error(`user ${username} doesnt exists`);
    return { res: {}, exists: false };
  }
};
