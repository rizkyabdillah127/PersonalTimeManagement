import { useEffect, useState } from "react";

export default function Timer({ onFinish }) {
  const [minutes, setMinutes] = useState(25); // user input
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [taskName, setTaskName] = useState("");

  // update waktu saat menit diubah
  useEffect(() => {
    setSecondsLeft(minutes * 60);
    setIsRunning(false);
  }, [minutes]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onFinish?.(taskName, minutes);
          playAlarm();
          setTaskName("");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const playAlarm = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
    audio.play();
  };

  const min = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const sec = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
      <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-2">
        Custom Focus Timer
      </h2>

      <div className="text-6xl font-mono font-bold text-white mb-6">
        {min}:{sec}
      </div>

      {/* INPUT TASK */}
      <div className="mb-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Tulis nama task..."
          disabled={isRunning}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 mb-4 disabled:opacity-50"
        />
      </div>

      {/* INPUT DURASI */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="number"
          min="1"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          disabled={isRunning}
          className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white disabled:opacity-50"
        />
        <span className="text-zinc-400">menit</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-2 rounded-lg text-white font-medium"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(minutes * 60);
          }}
          className="bg-zinc-700 hover:bg-zinc-600 transition px-6 py-2 rounded-lg text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}