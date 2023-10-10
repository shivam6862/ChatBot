"use client";
import { useState } from "react";
import classes from "../../styles/newChat.module.css";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { v4 } from "uuid";
import { useFetchUserPrevChatLink } from "../../hook/useFetchUserPrevChatLink";
import { BsChatLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { HiOutlineCheck } from "react-icons/hi";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import ConfirmDeleteChat from "./ConfirmDeleteChat";
import Backdrop from "../../ui/Backdrop";
import { useUpdateChatName } from "../../hook/useUpdateChatName";
import { useDeleteChat } from "../../hook/useDeleteChat";
import { useRouterPush } from "../../hook/useRouterPush";

const NewChat = ({
  setConversationId,
  conversationId,
  setInitialRender,
  setChat,
}) => {
  const {
    isLoading,
    data: prevchat,
    setData: setPrevData,
  } = useFetchUserPrevChatLink([]);

  const { routerPushChange } = useRouterPush();

  const [isDeleteHandler, setIsDeleteHandler] = useState({
    id: null,
    name: "",
    isCheck: false,
  });
  const deleteChatHandler = (id, name) => {
    setIsDeleteHandler({
      id: id,
      name: name,
      isCheck: true,
    });
  };
  const cancelDeleteChatHandler = () => {
    setIsDeleteHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };
  const acceptDeleteChatHandler = async () => {
    const response = await useDeleteChat(isDeleteHandler.id);
    if (response.message == "success") {
      const updatedChat = prevchat.filter(
        (chat) => chat.id !== isDeleteHandler.id
      );
      setPrevData(updatedChat);
      setChat([]);
      routerPushChange("new" + v4());
    }
    setIsDeleteHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };

  const [isEditHandler, setIsEditHandler] = useState({
    id: null,
    name: "",
    isCheck: false,
  });
  const editNameHandler = (id, name) => {
    console.log(name);
    setIsEditHandler({
      id: id,
      name: name,
      isCheck: true,
    });
  };
  const cancelEditNameHandler = () => {
    setIsEditHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };
  const acceptEditNameHandler = async () => {
    const response = await useUpdateChatName(
      isEditHandler.id,
      isEditHandler.name
    );
    if (response.message == "ok") {
      const updatedChat = prevchat.map((chat) => {
        if (chat.id === isEditHandler.id) {
          return {
            ...chat,
            name: isEditHandler.name,
          };
        } else {
          return chat;
        }
      });
      setPrevData(updatedChat);
    }
    setIsEditHandler({
      id: null,
      name: "",
      isCheck: false,
    });
  };

  return (
    <div className={classes.container}>
      {isDeleteHandler.isCheck && (
        <Backdrop onClick={cancelDeleteChatHandler} />
      )}
      {isDeleteHandler.isCheck && (
        <ConfirmDeleteChat
          cancelDeleteChatHandler={cancelDeleteChatHandler}
          acceptDeleteChatHandler={acceptDeleteChatHandler}
          name={isDeleteHandler.name}
          id={isDeleteHandler.id}
        />
      )}
      <div className={classes.items}>
        <div
          className={`${classes.item} ${
            "new" === conversationId.substr(0, 3) ? classes.active : ""
          }`}
          onClick={() => {
            if (conversationId.substr(0, 3) == "new") return;
            setConversationId("new" + v4());
            setInitialRender(true);
          }}
        >
          <div>
            <AiOutlinePlus size={18} /> {"  "}
            {"  "} New
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner
            minHeight={"30vh"}
            width={"40px"}
            height={"40px"}
            border={"4"}
          />
        ) : (
          <>
            {prevchat.map((item, index) => (
              <div
                key={index}
                id={item.id}
                className={`${classes.item} ${
                  item.id === conversationId ? classes.active : ""
                }`}
                onClick={() => {
                  setConversationId(item.id);
                }}
              >
                <div id={item.id}>
                  <BsChatLeft size={16} /> {"  "} {"  "}
                  {item.name}
                  {isEditHandler.isCheck && item.id == isEditHandler.id && (
                    <>
                      <div
                        className={` ${
                          isEditHandler ? classes.changeName : ""
                        }`}
                      >
                        <input
                          type="text"
                          onChange={(e) => {
                            setIsEditHandler((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                          }}
                          value={isEditHandler.name}
                        />
                        <div className={classes.changeNameButtons}>
                          <HiOutlineCheck
                            onClick={acceptEditNameHandler}
                            size={20}
                          />
                          <AiOutlineClose
                            onClick={cancelEditNameHandler}
                            size={16}
                          />
                        </div>
                      </div>
                      <div
                        className={classes.backdropEditName}
                        onClick={cancelEditNameHandler}
                      ></div>
                    </>
                  )}
                </div>
                {item.id == conversationId && (
                  <div id={item.id}>
                    <BiSolidEditAlt
                      onClick={() => {
                        editNameHandler(item.id, item.name);
                      }}
                    />
                    {"  "}
                    <MdDelete
                      onClick={() => {
                        deleteChatHandler(item.id, item.name);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NewChat;
