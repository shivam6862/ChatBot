"use client";
import React from "react";
import Image from "next/image";
import classes from "../../styles/home/ContactLogo.module.css";

const ContactLogo = ({ size, rotate, gapSize }) => {
  const URL = [
    "https://www.linkedin.com/",
    "https://www.instagram.com/",
    "https://twitter.com/",
    "https://www.facebook.com/",
  ];
  const contact_arr = ["linkedin", "instagram", "twitter", "facebook"];

  const openTab = (i) => {
    window.open(URL[i]);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.box}
        style={rotate == 1 ? { flexDirection: "column" } : { gap: gapSize }}
      >
        {contact_arr.map((item, index) => (
          <Image
            src={`/footer/${item}.svg`}
            width={size}
            height={size}
            alt={item}
            key={index}
            onClick={() => {
              openTab(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default ContactLogo;
