import React, { useEffect } from "react";

const Countdown = ({ timeLeft, setTimeLeft, formatTime, health, addSecond, progress, maxScore }) => {
  useEffect(() => {
    if (timeLeft <= 0 || health === 0 || progress === maxScore) return; // Exit if time runs out

    // Decrease timeLeft by 10 milliseconds
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 10);
    }, 10);

    // Clear the interval on component unmount or when timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className={`counter`}>
      <p className={`countdown ${timeLeft < 10250 ? "red-text blink" : ""}`}>{formatTime(timeLeft)}</p>
      {addSecond && <p className="addSeconds">+3s</p>}
    </div>
  );
};

export default Countdown;
