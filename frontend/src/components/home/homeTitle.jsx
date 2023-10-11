"use client";
import classes from "../../styles/home/homeTitle.module.css";
import Link from "next/link";

export default function HomeTitle() {
  return (
    <section className={classes.section}>
      <div className={classes.shape}></div>
      <div className={classes.content}>
        <h1>Knowledge at your doorstep</h1>
        <p>Efficient, Enjoyable Interactions for All.</p>
        <Link href={"/chat"}>Chat Now</Link>
      </div>
    </section>
  );
}
