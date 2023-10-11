"use client";
import { useContext } from "react";
import Image from "next/image";
import { FaHandsClapping } from "react-icons/fa6";
import classes from "../../styles/About.module.css";
import Header from "../../components/home/Header";
import ThemeContext from "../../store/theme/Theme-context";
import ContactLogo from "../../components/home/ContactLogo";

export default function About() {
  const themeCtx = useContext(ThemeContext);

  return (
    <div
      className={
        themeCtx.theme ? classes["dark-theme"] : classes["light_theme"]
      }
    >
      <Header />
      <div className={classes.box}>
        <p>
          <FaHandsClapping /> Hello <FaHandsClapping />
        </p>
        <Image
          src={"/img/thank_you_tinkeringlab.gif"}
          width={200}
          height={200}
        />
      </div>
      <div className={classes.bottom_footer}>
        <div className={classes.bottom_footer_left}>
          <p>Start your free trail</p>
          <button>Sign up free</button>
        </div>
        <div className={classes.bottom_footer_right}>
          <ContactLogo size={25} rotate={0} />
        </div>
      </div>
    </div>
  );
}
