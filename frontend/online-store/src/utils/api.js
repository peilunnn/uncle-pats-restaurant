import { v4 as uuidv4 } from "uuid";

const backendUrl = process.env.REACT_APP_LOCAL_BACKEND_URL;

export const createSnippet = async (data) => {
  const uuid = uuidv4();
  const snippetData = {
    ...data,
    uuid: uuid,
  };

  const response = await fetch(`${backendUrl}/snippets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(snippetData),
  });
  return response.json();
};
