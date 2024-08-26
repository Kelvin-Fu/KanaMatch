import React, { useEffect } from "react";

const Countdown = ({ timeLeft, setTimeLeft }) => {
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return; // Exit if time runs out

    // Decrease timeLeft by 10 milliseconds
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 10);
    }, 10);

    // Clear the interval on component unmount or when timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <div className="counter">{formatTime(timeLeft)}</div>;
};

export default Countdown;
