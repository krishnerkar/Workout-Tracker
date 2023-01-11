"use client";

import localFont from "@next/font/local";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import styles from "../../app/page.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";
import Image from "next/image";
import { Type } from "@prisma/client";
import { ScrollArea } from "@mantine/core";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

const calSans = localFont({
  src: "../../fonts/CalSans-SemiBold.woff",
  display: "swap",
});

const matter = localFont({
  src: [
    {
      path: "../../fonts/Matter-Light.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Matter-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Matter-Medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/Matter-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

const defaultType = {
  name: "bicep curls",
  id: 1,
};

type Set = {
  reps: number;
  weight: number;
};

type Exercise = {
  name: string;
  sets: Set[];
};

export default function Add(props: { password: string }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [calories, setCalories] = useState<number>();
  const [heartRate, setHeartRate] = useState<number>();
  const [notes, setNotes] = useState<string>("");

  const [addWorkoutLoading, setAddWorkoutLoading] = useState<boolean>(false);
  const [workoutId, setWorkoutId] = useState<number>();

  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<Type>(defaultType);

  const [addExerciseLoading, setAddExerciseLoading] = useState<boolean>(false);

  const [numberOfSets, setNumberOfSets] = useState<number>(1);

  const [sets, setSets] = useState<Set[]>();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetch("/api/get-types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setTypes(data.types);
        });
      } else {
        toast.error("Something went wrong!");
      }
    });
  });

  const addExercise = () => {
    if (!selectedType || !workoutId) {
      toast.error("Please fill in all fields!");
      return;
    }

    setAddExerciseLoading(true);
    fetch("/api/add-exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workoutId: workoutId,
        typeId: selectedType.id,
        sets: sets,
        password: props.password
      }),
    }).then((res) => {
      if (res.ok) {
        setAddExerciseLoading(false);
        toast.success("Exercise added!");

        exercises.push({
          name: selectedType.name,
          sets: sets || [],
        });

        setSelectedType(defaultType);
        setSets(undefined);
        setNumberOfSets(0);
      } else {
        toast.error("Something went wrong!");
        setAddExerciseLoading(false);
      }
    });
  };

  const addWorkout = () => {
    if (!minutes || !calories || !heartRate) {
      toast.error("Please fill in all fields!");
      return;
    }

    setAddWorkoutLoading(true);
    fetch("/api/add-workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        hours: hours,
        minutes: minutes,
        avgHeartRate: heartRate,
        notes: notes,
        calories: calories,
        password: props.password,
      }),
    }).then((res) => {
      if (res.ok) {
        setAddWorkoutLoading(false);
        toast.success("Workout added!");

        res.json().then((data) => {
          setWorkoutId(data.workoutId);
        });
      } else {
        toast.error("Something went wrong!");
        setAddWorkoutLoading(false);
      }
    });
  };

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <div>
        {workoutId != undefined && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#D9D9D9",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
              }}
              className={`${calSans.className}`}
            >
              {hours} hours {minutes} minutes
            </h1>

            <h1>.</h1>
            <h2
              style={{
                fontSize: "40px",
                color: "#444",
              }}
              className={`${calSans.className}`}
            >
              {calories} calories burnt
            </h2>
            <h1>.</h1>
            <h2
              style={{
                fontSize: "40px",
                color: "#ff0000",
              }}
              className={`${calSans.className}`}
            >
              {heartRate} avg bpm
            </h2>
          </div>
        )}

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {exercises?.map((exercise, i) => (
            <>
              <div
                style={{
                  background: "#D9D9D9",
                  padding: "30px",
                  borderRadius: "5px",
                  width: "",
                }}
              >
                <h3
                  style={{
                    color: "#000",
                    fontSize: "24px",
                  }}
                  className={calSans.className}
                >
                  {exercise.name}
                </h3>
                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  {exercise.sets.map((set, i) => (
                    <p
                      key={i}
                      style={{
                        fontWeight: 500,
                        fontSize: "20px",
                        marginTop: "5px",
                      }}
                      className={matter.className}
                    >
                      {set.reps} reps - {set.weight}kgs
                    </p>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>

        {workoutId == undefined && (
          <>
            <h1 className={`${calSans.className} ${styles.title}`}>
              Add Workout
            </h1>

            <div
              style={{
                marginTop: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  readOnly={addWorkoutLoading || workoutId != undefined}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className={`${matter.className} ${styles.input}`}
                  style={{
                    cursor: "text",
                  }}
                />

                <input
                  readOnly={addWorkoutLoading || workoutId != undefined}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  type="number"
                  className={`${matter.className} ${styles.input}`}
                  placeholder="Hours"
                  min={0}
                  max={60}
                  style={{
                    cursor: "pointer",
                    marginLeft: "20px",
                    width: "15%",
                  }}
                />

                <input
                  readOnly={addWorkoutLoading || workoutId != undefined}
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  type="number"
                  max={60}
                  min={0}
                  className={`${matter.className} ${styles.input}`}
                  placeholder="Minutes"
                  style={{
                    cursor: "pointer",
                    marginLeft: "20px",
                    width: "15%",
                  }}
                />

                <input
                  readOnly={addWorkoutLoading || workoutId != undefined}
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  type="number"
                  min={0}
                  className={`${matter.className} ${styles.input}`}
                  placeholder="Calories Burnt"
                  style={{
                    cursor: "pointer",
                    marginLeft: "20px",
                  }}
                />

                <input
                  readOnly={addWorkoutLoading || workoutId != undefined}
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  type="number"
                  className={`${matter.className} ${styles.input}`}
                  placeholder="Avg Heart Rate"
                  style={{
                    cursor: "pointer",
                    marginLeft: "20px",
                  }}
                />
              </div>

              <textarea
                readOnly={addWorkoutLoading || workoutId != undefined}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${matter.className} ${styles.input}`}
                placeholder={workoutId != undefined ? "" : "Notes"}
                style={{
                  cursor: "pointer",
                  marginTop: "20px",
                  width: "100%",
                  resize: "vertical",
                  filter:
                    addWorkoutLoading || workoutId != undefined
                      ? "grayscale(40%)"
                      : "none",
                }}
              />
            </div>

            <button
              onClick={addWorkout}
              disabled={addWorkoutLoading || workoutId != undefined}
              className={`${matter.className} ${styles.button}`}
            >
              <div
                style={{
                  marginRight: "30px",
                  display: addWorkoutLoading ? "block" : "none",
                }}
                className={styles.spinner}
              />

              {addWorkoutLoading
                ? "Submitting..."
                : workoutId
                ? "Workout Added!"
                : "Add Workout"}
            </button>
          </>
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

      <div
        style={{
          marginTop: "100px",
        }}
      >
        <h1 className={`${calSans.className} ${styles.title}`}>Add Exercise</h1>

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  border: "2px solid #000",
                  padding: "15px",
                  color: "#000",
                  fontSize: "16px",
                  borderRadius: "5px",
                  minWidth: "350px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  outline: "none",
                }}
                className={matter.className}
              >
                {selectedType?.name}
                <Image
                  style={{
                    marginRight: "10px",
                  }}
                  src={ChevronDownIcon}
                  alt="ChevronDownIcon"
                  width={15}
                  height={15}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                loop
                align="start"
                style={{
                  marginTop: "10px",
                  minWidth: "350px",
                  background: "#000",
                  borderRadius: "5px",
                }}
              >
                <ScrollArea style={{ height: 400 }}>
                  {types?.map((type, i) => (
                    <DropdownMenu.Item
                      onSelect={() => {
                        setSelectedType(type);
                      }}
                      key={i}
                      className={`${matter.className} ${styles.dropdownItem}`}
                    >
                      {type.name}
                    </DropdownMenu.Item>
                  ))}
                </ScrollArea>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <div
            style={{
              marginTop: "50px",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: "20px",
              }}
              className={matter.className}
            >
              Sets
            </p>

            {[...Array(numberOfSets)].map((_, index) => (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        marginTop: "20px",
                        color: "#777",
                      }}
                      className={matter.className}
                    >
                      Reps
                    </p>
                    <input
                      onChange={(e) => {
                        let updatedSets = [...(sets || [])];
                        updatedSets[index] = {
                          ...updatedSets[index],
                          reps: parseInt(e.target.value),
                        };
                        setSets(updatedSets);
                      }}
                      value={sets?.[index]?.reps}
                      type="number"
                      min={0}
                      className={`${matter.className} ${styles.input}`}
                      placeholder="Reps"
                      style={{
                        cursor: "pointer",
                        marginTop: "8px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        marginTop: "20px",
                        color: "#777",
                      }}
                      className={matter.className}
                    >
                      Weight
                    </p>
                    <input
                      onChange={(e) => {
                        let updatedSets = [...(sets || [])];
                        updatedSets[index] = {
                          ...updatedSets[index],
                          weight: parseFloat(e.target.value),
                        };
                        setSets(updatedSets);
                      }}
                      value={sets?.[index]?.weight}
                      type="number"
                      min={0}
                      step={0.1}
                      className={`${matter.className} ${styles.input}`}
                      placeholder="Weight"
                      style={{
                        cursor: "pointer",
                        marginTop: "8px",
                      }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setSets(sets?.filter((_, i) => i !== index));
                      setNumberOfSets(numberOfSets - 1);
                    }}
                    style={{
                      width: "auto",
                      height: "100%",
                      marginLeft: "30px",
                      fontSize: "15px",
                      padding: "10px",
                    }}
                    className={`${matter.className} ${styles.button}`}
                  >
                    Remove this set
                  </button>
                </div>
              </>
            ))}
            <button
              onClick={() => {
                setNumberOfSets(numberOfSets + 1);
              }}
              style={{
                width: "auto",
                marginTop: "30px",
                fontSize: "15px",
                padding: "10px",
              }}
              className={`${matter.className} ${styles.button}`}
            >
              Add a set
            </button>
          </div>

          <button
            style={{
              width: "100%",
              marginTop: "50px",
            }}
            onClick={addExercise}
            disabled={addExerciseLoading || workoutId == undefined}
            className={`${matter.className} ${styles.button}`}
          >
            <div
              style={{
                marginRight: "30px",
                display: addExerciseLoading ? "block" : "none",
              }}
              className={styles.spinner}
            />

            {addExerciseLoading
              ? "Submitting..."
              : workoutId
              ? "Add Exercise"
              : "Add workout first"}
          </button>
        </div>
      </div>
    </div>
  );
}
interface IParams extends ParsedUrlQuery {
  secretId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { secretId } = context.params as IParams;
  const actualSecretId = process.env.SECRET_ID;

  if (secretId !== actualSecretId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const password = process.env.PASSWORD;

  return {
    props: { password: password },
  };
};

export async function getStaticPaths() {
  return {
    paths: [`/${process.env.SECRET_ID}`],
    fallback: true,
  };
}
