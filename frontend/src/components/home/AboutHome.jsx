import React from "react";
import classes from "../../styles/home/AboutHome.module.css";
import LineSvg from "../../../public/LineSvg";
import Image from "next/image";

const AboutHome = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.top}>
          <LineSvg top={"#1b1b17"} bottom={"#ffd000"} />
          <div className={classes.top_contant}>
            <div className={classes.top_heading}>
              Watch your knowledge grow with ChatBot
            </div>
            <div className={classes.top_right}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email address.."
              />
              <button>Sign up free</button>
            </div>
          </div>
          <LineSvg top={"#ffd000"} bottom={"#000c1e"} />
        </div>
        <div className={classes.middle}>
          <h1>Build, test, and refine</h1>
          <p>
            ChatBot's Visual Builder empowers you to create perfect AI chatbots
            quickly and with no coding. Drag and drop conversational elements,
            and test them in real time to design engaging chatbot Stories.
          </p>
          <Image
            src={"/img/chatbot_flow_chat.png"}
            width={1500}
            height={700}
            alt="flow_chat"
          />
        </div>
        <div className={classes.bottom}>
          <LineSvg top={"#1b1b17"} bottom={"#1b222f"} />
          <div className={classes.bottom_container}>
            <div className={classes.bottom_left}>
              <Image
                src={"/img/chatbot_working.png"}
                width={1000}
                height={700}
                alt="working"
              />
            </div>
            <div className={classes.bottom_right}>
              <h1>Team up to succeed faster</h1>
              <p>
                Empowering seamless conversations, our website integrates
                LangChain's prowess with a user-friendly interface, delivering
                intelligent and engaging chatbot interactions.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.last_part}>
          <LineSvg
            top={"var(--black-1b222f--color)"}
            bottom={"var(--white-color)"}
          />
          <div className={classes.last_part_container}>
            <Image
              src={"/img/our_users.png"}
              width={1500}
              height={800}
              alt="users"
            />
            <h1>Get more value from your favorite tools</h1>
            <p>
              Experience seamless conversations with our chatbot powered by
              LangChain, featuring an intuitive front end and a robust,
              responsive backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
