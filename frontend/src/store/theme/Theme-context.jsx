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

  useEffect(() => {
    const color = fetchCookies();
    if (color == "dark") setTheme(true);
    else setTheme(false);
  }, []);

  function toggleThemeHandler() {
    setTheme((theme) => !theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
