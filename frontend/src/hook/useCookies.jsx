import { setCookie, deleteCookie, getCookie } from "cookies-next";
const THEME_COOKIE_NAME = "theme";

export const useCookies = () => {
  const updateCookies = (theme) => {
    setCookie(THEME_COOKIE_NAME, theme);
  };

  const setThemeCookie = () => {
    setCookie(THEME_COOKIE_NAME, "light");
  };

  const fetchCookies = () => {
    return getCookie(THEME_COOKIE_NAME);
  };

  const removeCookies = () => {
    deleteCookie(THEME_COOKIE_NAME);
  };

  return {
    updateCookies,
    setThemeCookie,
    fetchCookies,
    removeCookies,
  };
};
