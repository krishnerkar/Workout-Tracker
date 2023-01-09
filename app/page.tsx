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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "1500px",
          flex: 1,
          background: "#fff",
          // padding: "80px",
        }}
        className={styles.main}
      >
        <h1 className={`${styles.title} ${calSans.className}`}>
          {"Krish's Workout Streak"}
        </h1>
        <h2 className={`${styles.description} ${matter.className}`}>
          {`My new year’s resolution was to show up at the gym everyday no matter what, 
          20 mins or 90 mins. `}
          <b>JUST SHOW UP EVERYDAY.</b>
        </h2>

        <div className={styles.grid}>
          {[...Array(7 * 4 * 7)].map((_, i) => {
            const random = Math.random();
            const color = [
              `rgba(0, 0 ,0 ,1)`,
              `rgba(0, 0 ,0 ,0.8)`,
              `rgba(0, 0 ,0 ,1)`,
              `rgba(0, 0 ,0 ,0.8)`,
              `rgba(0, 0 ,0 ,1)`,
              `rgba(0, 0 ,0 ,0.8)`,
              `rgba(0, 0 ,0 ,1)`,
              `rgba(0, 0 ,0 ,0.8)`,
              `rgba(0, 0 ,0 ,1)`,
              `rgba(0, 0 ,0 ,0.8)`,
            ];

            return (
              <div
                key={i}
                className={styles.box}
                style={{
                  background: color[i],
                  border: `1px solid #D9D9D9`,
                }}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
