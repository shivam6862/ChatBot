import React from "react";
import classes from "../../styles/home/KnowAboutCompany.module.css";
import Image from "next/image";
import ContactLogo from "./ContactLogo";
import footer_Items from "../../../public/footer_Items.json";

const KnowAboutCompany = () => {
  return (
    <div className={classes.container} id="contact">
      <div className={classes.box}>
        <div className={classes.top}>
          <div className={classes.top_contant}>
            <h1>What is a chatbot?</h1>
            <p>
              Welcome to our innovative online platform, where cutting-edge
              technology meets intuitive communication. We've combined the power
              of LangChain with a user-friendly front end and a robust backend
              to create a seamless chatting experience. Our chatbot is designed
              to understand your queries, provide insightful responses, and
              engage in meaningful conversations.
            </p>
            <p>
              Our chatbot leverages LangChain's advanced language processing
              capabilities, ensuring accurate and context-aware
              responses.Navigate effortlessly through our user-friendly
              interface, designed to enhance your chatting experience. Powered
              by a robust backend system, our chatbot delivers swift and
              reliable responses, making your interactions efficient and
              enjoyable.
            </p>
            <button>Watch Instruction lessons</button>
          </div>
          <div className={classes.top_images}>
            <Image
              src={"/img/learn_with_me.png"}
              width={1500}
              height={800}
              alt="learn"
            />
          </div>
        </div>
        <div className={classes.bottom}>
          {footer_Items.map((category) => (
            <div key={category.category} className={classes.bottom_items_box}>
              <h2>{category.category}</h2>
              <div className={classes.bottom_items}>
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory} className={classes.bottom_item}>
                    {subcategory}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default KnowAboutCompany;
