import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [task, setTask] = useState("");

  return (
    <div className="flex gap-3 mt-6">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="flex-1 rounded-xl px-4 py-3 text-black"
      />

      <button
        onClick={() => {
          if (!task.trim()) return;
          onAdd(task);
          setTask("");
        }}
        className="bg-blue-600 px-6 py-3 rounded-xl text-white"
      >
        Tambah
      </button>
    </div>
  );
}
