"use client";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NewChat from "../../components/newChat/NewChat";
import { useFetchUserChatById } from "../../hook/useFetchUserChatById";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ChatBot from "../../components/chatBot/ChatBot";
import { useRouterPush } from "../../hook/useRouterPush";
import Footer from "../../components/footer/Footer";
import { BsCaretRightSquare } from "react-icons/bs";
import classes from "../../styles/Chat.module.css";

const ChatPages = () => {
  const { routerPushChange } = useRouterPush();
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const currentURL = current.toString().substring(9);

  const [conversationId, setConversationId] = useState(
    currentURL == "" ? "new" + v4() : currentURL
  );
  const [initialRender, setInitialRender] = useState(true);
  const [isOpenNewchat, setIsOpenNewchat] = useState(true);

  const toggleNewChat = () => {
    setIsOpenNewchat((prev) => !prev);
  };
  const onSelect = (event) => {
    routerPushChange(event);
  };

  const {
    isLoading,
    data: chat,
    setData: setChat,
    messageHistory,
    setMessageHistory,
  } = useFetchUserChatById(conversationId, []);

  useEffect(() => {
    setInitialRender(true);
    onSelect(conversationId);
  }, [conversationId]);

  if (isLoading)
    return (
      <div className={classes.loadingSpinner}>
        <LoadingSpinner
          minHeight={"100vh"}
          width={"64px"}
          height={"64px"}
          border={"6"}
        />
      </div>
    );

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div
          className={`${classes.left} ${
            isOpenNewchat ? "" : classes.displayNone
          }`}
        >
          <NewChat
            setConversationId={setConversationId}
            conversationId={conversationId}
            setInitialRender={setInitialRender}
            setChat={setChat}
            setIsOpenNewchat={toggleNewChat}
          />
        </div>
        <div
          className={`${classes.buttons} ${
            isOpenNewchat ? classes.displayNone : ""
          }`}
          onClick={toggleNewChat}
        >
          <BsCaretRightSquare size={18} />
        </div>
        <div className={classes.right}>
          <ChatBot
            id={conversationId}
            chat={chat}
            setChat={setChat}
            initialRender={initialRender}
            setInitialRender={setInitialRender}
            setConversationId={setConversationId}
            messageHistory={messageHistory}
            setMessageHistory={setMessageHistory}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPages;
