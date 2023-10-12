"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "../../styles/home/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import ContactLogo from "./ContactLogo";
import { usePathname } from "next/navigation";
import { FiSun } from "react-icons/fi";
import { BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import { useCookies } from "../../hook/useCookies";
import ThemeContext from "../../store/theme/Theme-context";

const Header = () => {
  const themeCtx = useContext(ThemeContext);
  const { updateCookies, fetchCookies } = useCookies();

  function changeTheme(e) {
    themeCtx.toggleTheme();
    if (fetchCookies() == "light") {
      updateCookies("dark");
    } else {
      updateCookies("light");
    }
  }

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentNav, setCurrentNav] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const navref = useRef(null);
  const NavBarContent = ["/#home", "/about", "/chat", "/#contact"];
  const currentPath = usePathname();
  const isHeaderBackground = currentPath == "/about" || currentPath == "/work";
  const [isScroll, setIsScroll] = useState(false);

  const navBarBottomNavigation = (index) => {
    const navDiv = navref.current;
    const aElements = navDiv.getElementsByTagName("a");
    const calcLeft = aElements[index].offsetLeft;
    navDiv.style.setProperty("--left-navbar", calcLeft + "px");
    const calWidth = aElements[index].offsetWidth / navDiv.offsetWidth;
    navDiv.style.setProperty("--width-navbar", calWidth);
  };

  if (windowWidth >= 940 && isNavCollapsed === true) {
    setIsNavCollapsed(false);
  }

  const handleNavLinkClick = (index) => {
    navBarBottomNavigation(index);
    setCurrentNav(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    navBarBottomNavigation(currentNav);
  }, [windowWidth]);

  useEffect(() => {
    if (currentPath == "/") {
      return;
    }
    const currentIndex = NavBarContent.findIndex(
      (path) => path === currentPath
    );
    if (currentIndex != -1) handleNavLinkClick(currentIndex);
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        isHeaderBackground
          ? `${classes.header_background} ${classes.header}`
          : isScroll
          ? `${classes.header} ${classes.header_background}`
          : `${classes.header}`
      }
    >
      <div className={classes.left_logo}>
        <Link
          href={"/"}
          onClick={() => {
            handleNavLinkClick(0);
          }}
        >
          <Image src={"/logo.jpg"} width={48} height={48} alt="logo" />
        </Link>
      </div>

      <button
        className={isNavCollapsed ? classes.hamburgerchange : classes.hamburger}
        onClick={() => {
          setIsNavCollapsed(!isNavCollapsed);
        }}
      >
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
        <div className={classes.line3}></div>
      </button>
      <div
        className={
          isNavCollapsed
            ? classes.right_Navigation_Collapsed
            : classes.right_Navigation
        }
        ref={navref}
      >
        {NavBarContent.map((item, index) => (
          <Link
            href={item}
            id={item}
            key={index}
            onClick={() => {
              setIsNavCollapsed(false);
              handleNavLinkClick(index);
            }}
            style={
              currentNav == index
                ? isNavCollapsed
                  ? { color: "var(--primary-color)" }
                  : { color: "var(--primary-color)" }
                : {}
            }
          >
            {item.includes("#") ? item.substring(2) : item.substring(1)}
          </Link>
        ))}
        <div className={classes.button_day_night}>
          <input
            type="checkbox"
            id="theme-toggle"
            onChange={changeTheme}
            checked={themeCtx.theme}
          />
          <label htmlFor="theme-toggle">
            <div>
              {themeCtx.theme ? (
                <FiSun size={20} color="white" />
              ) : (
                <BsMoonFill size={20} color="black" />
              )}
            </div>
          </label>
        </div>
        <div className={classes.contactlogos}>
          <h1>Follow us on</h1>
          <ContactLogo size={30} rotate={0} />
        </div>
      </div>
    </div>
  );
};

export default Header;
