"use client";
import classes from "../styles/home/Home.module.css";
import Header from "../components/home/Header";
import HomeTitle from "../components/home/homeTitle";
import AboutHome from "../components/home/AboutHome";
import KnowAboutCompany from "../components/home/KnowAboutCompany";

const Home = () => {
  return (
    <div className={classes.container}>
      <Header />
      <HomeTitle />
      <AboutHome />
      <KnowAboutCompany />
    </div>
  );
};
export default Home;
