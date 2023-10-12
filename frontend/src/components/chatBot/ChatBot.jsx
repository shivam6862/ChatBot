"use client";
import { useEffect, useContext } from "react";
import classes from "../../styles/ChatBot.module.css";
import ChatContainer from "./ChatContainer";
import usecreateConversation from "../../hook/usecreateConversation";
import AuthenticationContext from "../../store/authentication/Authentication-context";
import { useSendUserChatById } from "../../hook/useSendUserChatById";
import { useRouterPush } from "../../hook/useRouterPush";

const ChatBot = ({
  id,
  chat,
  setChat,
  initialRender,
  setInitialRender,
  setConversationId,
  messageHistory,
  setMessageHistory,
}) => {
  const AuthenticationCtx = useContext(AuthenticationContext);
  const { routerPushChange } = useRouterPush();
  const { create } = usecreateConversation();
  const { sendUserChat } = useSendUserChatById();
  useEffect(() => {
    const functioning = async () => {
      if (
        id.substr(0, 3) == "new" &&
        chat.length == 2 &&
        initialRender == false
      ) {
        var name = chat[1].text.substr(0, 25);
        if (chat[1].text.length > 25) name = name + "..";
        const newId = await create(name, chat, id.substr(3), messageHistory);
        routerPushChange(newId);
        setConversationId(newId);
        AuthenticationCtx.setDetails(newId, "", "");
      }
    };
    functioning();
  }, [id.substr(0, 3) == "new" && chat.length == 2]);

  useEffect(() => {
    const sendUserChatId = async () => {
      if (initialRender) {
        setInitialRender(false);
        return;
      }

      const sendUserChat_Id = async () => {
        if (chat.length <= 2) return;
        const response = await sendUserChat(id, chat, messageHistory);
        console.log(response);
      };
      sendUserChat_Id();
    };
    sendUserChatId();
  }, [chat]);

  return (
    <div className={classes.containerchatbot}>
      <ChatContainer
        setChat={setChat}
        chat={chat}
        id={id}
        messageHistory={messageHistory}
        setMessageHistory={setMessageHistory}
      />
    </div>
  );
};

export default ChatBot;
