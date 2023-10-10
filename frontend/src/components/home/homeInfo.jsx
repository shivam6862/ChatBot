"use client";
import { useEffect, useRef, useState } from "react";
import classes from "../../styles/home/homeInfo.module.css";

const data = {
  left: [
    "Empowering seamless conversations, our website integrates LangChain's prowess with a user-friendly interface, delivering intelligent and engaging chatbot interactions.",
    "Experience seamless conversations with our chatbot powered by LangChain, featuring an intuitive front end and a robust, responsive backend.",
  ],
  right: [
    "Welcome to our innovative online platform, where cutting-edge technology meets intuitive communication. We've combined the power of LangChain with a user-friendly front end and a robust backend to create a seamless chatting experience. Our chatbot is designed to understand your queries, provide insightful responses, and engage in meaningful conversations.",
    "Our chatbot leverages LangChain's advanced language processing capabilities, ensuring accurate and context-aware responses.Navigate effortlessly through our user-friendly interface, designed to enhance your chatting experience. Powered by a robust backend system, our chatbot delivers swift and reliable responses, making your interactions efficient and enjoyable.",
  ],
};

export default function HomeInfo() {
  const p1 = useRef();
  const p2 = useRef();
  const container = useRef();
  const refs = [p1, p2];
  const [show, setShow] = useState([true, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setShow((show) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show = show.map((el) => false);
              show[entry.target.getAttribute("data-key")] = true;
            }
          });

          return [...show];
        });
      },
      {
        threshold: 0.5,
      }
    );

    refs.forEach((ref) => observer.observe(ref.current));
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes.left}>
        {data.left.map(
          (info, index) => show[index] && <p key={index}>{info}</p>
        )}
      </div>
      <div ref={container} className={classes.right}>
        {data.right.map((info, index) => (
          <p data-key={index} key={index} ref={refs[index]}>
            {info}
          </p>
        ))}
      </div>
    </section>
  );
}
