import LineSvg from "../../../public/LineSvg";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#0000ff",
        padding: "0rem",
        color: "#ffffff",
        textAlign: "center",
        fontSize: "1rem",
        margin: "0rem",
      }}
    >
      <div style={{ padding: "0.25rem" }}>Made with ❤ © 2023.. Made by us</div>
      <LineSvg top={"#0000ff"} bottom={"#000000"} />
    </div>
  );
};
export default Footer;
