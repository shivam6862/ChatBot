import { useLocalStorage } from "./useLocalStorage";

export const useDeleteChat = async (conversationId, name) => {
  const { fetchPersonalDetails } = useLocalStorage();
  const user = fetchPersonalDetails();
  const userId = user.data.id;
  const authToken = user.token;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/deletechat/${conversationId}/${userId}`;

  const headers = new Headers({
    Authorization: `${authToken}`,
    "Content-Type": "application/json",
  });

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({}),
  });

  const data = await response.json();
  return data;
};
