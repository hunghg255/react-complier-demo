import { useMemo, useRef, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const timerInterval = useRef<number | undefined>();
  const [isPaused, setIsPaused] = useState(true);

  const formattedTime = useMemo(() => {
    let hours: number | string = Math.floor(time / (60 * 60));
    let minutes: number | string = Math.floor(time / 60);
    let seconds: number | string = time % 60;

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${hours}:${minutes}:${seconds}`;
  }, [time]);

  const onReset = () => {
    setTime(0);
  };
  const onStop = () => {
    setIsPaused(true);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  };

  const onStart = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    setIsPaused(false);
    timerInterval.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const btnStyles = (active: boolean) =>
    active ? "bg-white text-slate-800" : "bg-slate-800 text-white";

  return (
    <div className="dark flex w-full flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-6xl font-bold mb-4" id="timer">
          {formattedTime}
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={onStart} className={btnStyles(isPaused)}>
            Start
          </button>
          <button onClick={onStop} className={btnStyles(!isPaused)}>
            Stop
          </button>
          <button onClick={onReset} className={btnStyles(false)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
