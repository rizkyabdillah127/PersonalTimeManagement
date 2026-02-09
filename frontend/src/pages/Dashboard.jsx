import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Stats from "../components/Stats";
import TaskItem from "../components/TaskItem";
import DailyNote from "../components/DailyNote";
import AITaskBreakdown from "../components/AITaskBreakdown";
import ProgressChart from "../components/ProgressChart";

export default function Dashboard() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [sessions, setSessions] = useState(
    Number(localStorage.getItem("sessions")) || 0
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("sessions", sessions);
  }, [tasks, sessions]);


  const handleTimerFinish = (taskName, duration) => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        duration: duration,
        completedAt: new Date().toLocaleString("id-ID"),
      };
      setTasks([...tasks, newTask]);
      setSessions((s) => s + 1);
    }
  };

  // Untuk menambah hasil breakdown ke checklist harian
  const handleBreakdown = (breakdown) => {
    // Ambil checklist harian dari localStorage
    const saved = localStorage.getItem("dailyChecklist");
    let items = [];
    if (saved) items = JSON.parse(saved);
    // Tambahkan hasil breakdown sebagai item baru
    const newItems = [
      ...items,
      ...breakdown.filter(Boolean).map(text => ({ text, done: false }))
    ];
    localStorage.setItem("dailyChecklist", JSON.stringify(newItems));
    // Trigger re-render DailyNote dengan event storage
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <main className="max-w-3xl mx-auto px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Time Management App</h1>
        <button
          onClick={() => {
            if (window.confirm('Reset semua histori task dan sesi?')) {
              setTasks([]);
              setSessions(0);
              localStorage.removeItem('tasks');
              localStorage.removeItem('sessions');
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Reset Histori
        </button>
      </div>

  <AITaskBreakdown onBreakdown={handleBreakdown} />
  <DailyNote />
      <Timer onFinish={handleTimerFinish} />
      <Stats sessions={sessions} />
      <ProgressChart tasks={tasks} />


      <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">📋 Histori Task</h2>
          <span className="text-sm text-gray-500">{tasks.length} task selesai</span>
        </div>
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-4">Belum ada task yang diselesaikan</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {[...tasks].reverse().map((t, i) => (
              <TaskItem
                key={t.id || i}
                text={typeof t === "string" ? t : t.name}
                duration={typeof t === "object" ? t.duration : null}
                completedAt={typeof t === "object" ? t.completedAt : null}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
