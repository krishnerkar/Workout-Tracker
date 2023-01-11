"use client";

import localFont from "@next/font/local";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { SimpleWorkout } from "pages/api/get-workouts";
import { toast, Toaster } from "react-hot-toast";
import { Tooltip } from "@mantine/core";

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

let i = 0;

export default function Home() {
  const [workouts, setWorkouts] = useState<SimpleWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workouts.length > 0 || i > 0) {
      return;
    } else {
      setIsLoading(true);
      fetch("/api/get-workouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setWorkouts(data.workouts);
            i++;
          });
        } else {
          toast.error("Something went wrong!");
        }
        setIsLoading(false);
      });
    }
  });

  const time = workouts?.map((workout) => workout.hours * 60 + workout.minutes);
  const max = Math.max(...(time || []));

  const [currentBox, setCurrentBox] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (workouts.length == 0) return;
    if (!isAnimating && !animationCompleted) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentBox(currentBox + 1);
        setIsAnimating(false);
      }, 50);
      if (currentBox == workouts.length) setAnimationCompleted(true);
    }
  }, [currentBox, isAnimating, workouts]);

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const diffInMilliSeconds = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  let currWorkoutIndex = 0;

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
      {!isLoading ? (
        <div className={styles.grid}>
          {[...Array(7 * 4 * 7)].map((_, i) => {
            const day = i + 2;
            const date = new Date(new Date().getFullYear(), 0, day);

            let transparency = 0;

            const workoutForDate = workouts.find(
              (workout) => workout.date === date.toISOString().split("T")[0]
            );
            if (workoutForDate) {
              currWorkoutIndex = workouts.indexOf(workoutForDate);
              transparency = time[currWorkoutIndex] / max;
            }

            const dateString = new Date(date.toISOString().split("T")[0])
              .toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
              .split(",")
              .join("");

            return (
              <Tooltip
                className={matter.className}
                style={{
                  background: "#000",
                  fontSize: "10px",
                }}
                key={i}
                label={
                  transparency !== 0
                    ? `${time[currWorkoutIndex]} minutes - ${dateString}`
                    : `No workout on ${dateString}`
                }
              >
                <div
                  className={`${styles.box} ${
                    i === currentBox ? styles.animate : ""
                  }`}
                  style={{
                    background:
                      i > currentBox
                        ? "transparent"
                        : `rgb(18, 122, 223, ${transparency})`,

                    border: `1px solid ${
                      transparency === 0
                        ? "#EEF6FD"
                        : i > currentBox
                        ? "#EEF6FD"
                        : "transparent"
                    }`,
                  }}
                />
              </Tooltip>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            marginTop: 100,
            width: 40,
            height: 40,
          }}
          className={styles.spinnerBlack}
        />
      )}

      <Toaster
        toastOptions={{
          className: matter.className,
          style: {
            border: "1px solid #000",
            padding: "16px",
            fontSize: "14px",
            color: "#000",
          },
        }}
      />
    </div>
  );
}
