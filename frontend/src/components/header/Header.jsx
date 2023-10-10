"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import classes from "../../styles/ChatBot.module.css";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../../hook/useLocalStorage";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ id }) => {
  const router = useRouter();
  const authenticationContextCtx = useContext(AuthenticationContext);
  const { fetchPersonalDetails, removePersonalDetails } = useLocalStorage();

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(fetchPersonalDetails());
  }, [authenticationContextCtx.details.phone]);

  const logOutHandler = () => {
    removePersonalDetails();
    setUser(null);
    authenticationContextCtx.setDetails("noUser", "", "", "");
    router.push(`/`);
  };

  return (
    <div className={classes.header}>
      <Image src="/logo.jpg" width={50} height={50} alt="chat" />
      <div className={classes.title}>
        <h3>Chat Bot {id}</h3>
        <div className={classes.right_part}>
          <div className={classes.right_image}>
            <FaUserCircle size={24} />
          </div>
          <div
            className={`${classes.right_text}`}
            onClick={() => {
              if (user == null || user == undefined)
                authenticationContextCtx.onShow("LogInOpen");
              else logOutHandler();
            }}
          >
            {user?.token ? "Log out" : "Sign In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
