import React, { useState, useEffect } from "react";

function App() {
  const initialTime = 1500; // 25 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        {!isRunning ? (
          <button className="btn" onClick={startTimer}>Start</button>
        ) : (
          <button className="btn" onClick={stopTimer}>Stop</button>
        )}
        <button className="btn" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
