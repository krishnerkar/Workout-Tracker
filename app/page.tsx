"use client";

import localFont from "@next/font/local";
import styles from "./page.module.css";

const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff",
  display: "swap",
});

const matter = localFont({
  src: [
    {
      path: "../fonts/Matter-Light.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Matter-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Matter-Medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Matter-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function Home() {
  return (
    <div>
      <h1 className={`${styles.title} ${calSans.className}`}>
        {"Krish's Workout Streak"}
      </h1>
      <h2 className={`${styles.description} ${matter.className}`}>
        {`My new year’s resolution was to show up at the gym everyday no matter what, 
          20 mins or 90 mins. `}
        <b>JUST SHOW UP EVERYDAY.</b>
      </h2>

      <div className={styles.grid}>
        {[...Array(365)].map((_, i) => {
          const random = Math.random();

          return (
            <div
              key={i}
              className={styles.box}
              style={{
                // background: `rgb(18, 122, 223, ${random})`,
                border: `1px solid #D9D9D9`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
