import { BsFillChatLeftDotsFill } from "react-icons/bs";

const ChatLogo = ({ dim, dimL }) => {
  return (
    <div
      style={{
        backgroundColor: "#0000FF",
        width: dimL,
        height: dimL,
        borderRadius: "50%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BsFillChatLeftDotsFill size={dim} color="white" />
      </div>
    </div>
  );
};
export default ChatLogo;
