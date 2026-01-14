import React, { useEffect } from "react";

const Countdown = ({ timeLeft, setTimeLeft, formatTime, health, addSecond, progress, maxScore }) => {
  useEffect(() => {
    if (timeLeft <= 0 || health === 0 || progress === maxScore) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 10) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimeLeft - 10;
      });
    }, 10);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [health, progress, maxScore, setTimeLeft]);

  return (
    <div className={`counter`}>
      <p className={`countdown ${timeLeft < 10250 ? "red-text blink" : ""}`}>{formatTime(timeLeft)}</p>
      {addSecond && <p className="addSeconds">+3s</p>}
    </div>
  );
};

export default Countdown;
