"use client";
import { useContext } from "react";
import classes from "../styles/home/Home.module.css";
import Header from "../components/home/Header";
import HomeTitle from "../components/home/homeTitle";
import ThemeContext from "../store/theme/Theme-context";

export default function Home() {
  const themeCtx = useContext(ThemeContext);

  return (
    <div
      className={
        themeCtx.theme ? classes["dark-theme"] : classes["light_theme"]
      }
    >
      <Header />
      <HomeTitle />
    </div>
  );
}
