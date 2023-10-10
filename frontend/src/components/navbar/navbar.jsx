"use client";
import { useContext, useRef } from "react";
import classes from "../../styles/Navbar.module.css";
import Image from "next/image";
import ThemeContext from "../../store/theme/Theme-context";
import useScrollRatio from "../../hook/scrollRatio";
import { FiSun } from "react-icons/fi";
import { BsMoonFill } from "react-icons/bs";
import Link from "next/link";

export default function Navbar() {
  const themeCtx = useContext(ThemeContext);
  const element = useRef();
  useScrollRatio((height) => {
    const scroll = window.scrollY;

    if (scroll <= 500) element.current.style.opacity = 0;
    else element.current.style.opacity = 1;
  }, element.current);

  function changeTheme(e) {
    themeCtx.toggleTheme();
  }

  return (
    <nav className={classes.main}>
      <div className={classes.images}>
        <Image src="/logo.jpg" width={40} height={40} alt="chat" />
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Work</li>
        <li>Contact</li>
      </ul>
      <input type="checkbox" id="theme-toggle" onChange={changeTheme} />
      <label htmlFor="theme-toggle">
        <div>
          {themeCtx.theme ? (
            <FiSun size={20} color="black" />
          ) : (
            <BsMoonFill size={20} color="black" />
          )}
        </div>
      </label>
      <Link href={"/chat"}>Chat</Link>
      <div
        ref={element}
        style={{
          backgroundColor: `${
            themeCtx.theme ? "black" : "var(--white-light-color)"
          }`,
          height: "100%",
          width: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "0",
          opacity: "0",
        }}
      ></div>
    </nav>
  );
}
