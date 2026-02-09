import { useState, useEffect } from "react";

export default function DailyNote() {
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dailyNote");
    if (saved) setNote(saved);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem("dailyNote", e.target.value);
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-6 shadow">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Catatan Harian</h2>
      <textarea
        className="w-full min-h-[120px] border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
        placeholder="Tulis catatan, refleksi, atau rencana hari ini..."
        value={note}
        onChange={handleChange}
      />
    </div>
  );
}
