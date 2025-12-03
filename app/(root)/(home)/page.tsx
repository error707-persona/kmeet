"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second
 
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const date = currentTime.getDate();
  const day = days[currentTime.getDay()];
  const month = months[currentTime.getMonth()];
  const fullYear = currentTime.getFullYear();

  return (
    <section className="flex h-[calc(100vh-5rem)] size-full flex-col gap-10 text-white">
      <div className="h-1/2 w-full rounded bg-hero bg-cover">
        <div className="flex h-full w-fit flex-col justify-between max-md:px-2 max-md:py-5 lg:p-11">
          <h2 className="glassmorphism w-max rounded py-2 px-2 text-xs font-normal">
            {/* Upcoming meet at: 12:30 PM */}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold lg:text-7xl">
              {hours} : {minutes}
            </h1>
            <p className="text-lg font-medium text-blue-300 lg:text-2xl">
              {day}, {month} {date}, {fullYear}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
