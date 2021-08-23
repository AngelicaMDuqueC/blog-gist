export const removeGist = (gists, gist_id) => {
  return gists.reduce((acc, curr) => {
    if (curr.id !== gist_id) {
      acc.push({ ...curr });
    }
    return acc;
  }, []);
};

export const updateGist = (gists, updatedGist) => {
  return gists.map((gist) => {
    if (gist.id === updatedGist.id) return { ...updatedGist };
    return { ...gist };
  });
};

export const getGistFileData = async (gist) => {
  const resp = await fetch(gist.url);
  const reader = resp.body.getReader();
  const { value } = await reader.read();
  const content = new TextDecoder().decode(value);
  const [title = "", firstPharagraph = ""] = content.split("\n\n");
  const summary = title.replace("# ", "") || firstPharagraph.slice(0, 100);

  return { content, summary };
};

export const getGistData = (resp) => {
  const { data } = resp;
  const { id, description, files, updated_at } = data;
  const firstFile = Object.keys(files)[0];
  const gistData = {
    id,
    url: files[firstFile].raw_url,
    type: files[firstFile].type,
    description,
    file: firstFile,
    updated_at,
  };

  return gistData;
};

export const transformResponseToGistData = async (resp) => {
  const gistData = getGistData(resp);
  const { content, summary } = await getGistFileData(gistData);

  return {
    ...gistData,
    content,
    summary,
  };
};
