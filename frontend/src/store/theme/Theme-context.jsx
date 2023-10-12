"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "../../hook/useCookies";

const ThemeContext = React.createContext({
  theme: false,
  toggleTheme: () => {},
});

export function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(false);
  const { fetchCookies } = useCookies();

  function applyDarkTheme() {
    const root = document.documentElement;
    root.style.setProperty("--white-color", "#000000");
    root.style.setProperty("--black-color", "#ffffff");
    root.style.setProperty("--white-light-color", "#1b222f");
    root.style.setProperty("--light-black-color", "#f6f6f6");
    root.style.setProperty(
      "--background-header-color",
      "var(--background-header-contract-color)"
    );
  }

  function applyLightTheme() {
    const root = document.documentElement;
    root.style.setProperty("--white-color", "#ffffff");
    root.style.setProperty("--black-color", "#000000");
    root.style.setProperty("--white-light-color", "#f6f6f6");
    root.style.setProperty("--light-black-color", "#1b222f");
    root.style.setProperty(
      "--background-header-color",
      "var(--background-header-color)"
    );
  }

  useEffect(() => {
    const color = fetchCookies();
    if (color == "dark") {
      setTheme(true);
      applyDarkTheme();
    } else {
      setTheme(false);
      applyLightTheme();
    }
  }, []);

  function toggleThemeHandler() {
    if (theme == false) applyDarkTheme();
    else applyLightTheme();
    setTheme((theme) => !theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
