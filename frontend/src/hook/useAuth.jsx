import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";
import { useCookies } from "./useCookies";

const useAuth = () => {
  const { updatePersonalDetails } = useLocalStorage();
  const { NotificationHandler } = useNotification();
  const { setIsLoggedInCookie } = useCookies();
  const Auth = async (data, type) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${type}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      NotificationHandler(responsedata.message, "Info");
      if (responsedata.navigate == "true" && type == "verify") {
        updatePersonalDetails(responsedata);
        setIsLoggedInCookie(true);
      }
      return responsedata.navigate;
    } catch (err) {
      console.log(err);
      NotificationHandler("Check your connection!", "Error");
      return "false";
    }
  };
  return { Auth };
};

export default useAuth;
