import { useState, useEffect } from "react";

export default function AITaskBreakdown({ onBreakdown }) {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  // Load saved checklist dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("aiChecklist");
    if (saved) setResults(JSON.parse(saved));
  }, []);

  // Simpan checklist ke localStorage setiap berubah
  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem("aiChecklist", JSON.stringify(results));
    }
  }, [results]);

  const handleBreakdown = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/hf-breakdown`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const data = await response.json();

      let breakdown = [];
      if (Array.isArray(data)) {
        breakdown = data.filter(Boolean);
      } else if (typeof data === "string") {
        breakdown = data.split("\n").filter(Boolean);
      } else if (data.generated_text) {
        breakdown = data.generated_text.split("\n").filter(Boolean);
      }

      const checklistItems = breakdown.map(text => ({ text, done: false }));
      setResults(checklistItems);
      if (onBreakdown) onBreakdown(breakdown);
    } catch (e) {
      setError("Gagal memproses. Pastikan server proxy berjalan.");
    }
    setLoading(false);
  };

  const toggleDone = (idx) => {
    setResults(results.map((item, i) => i === idx ? { ...item, done: !item.done } : item));
  };

  const removeItem = (idx) => {
    const updated = results.filter((_, i) => i !== idx);
    setResults(updated);
    if (updated.length === 0) localStorage.removeItem("aiChecklist");
  };

  const clearAll = () => {
    setResults([]);
    localStorage.removeItem("aiChecklist");
  };

  const completedCount = results.filter(r => r.done).length;

  return (
    <div className="bg-blue-50 rounded-xl p-4 mb-6 shadow">
      <h2 className="text-lg font-semibold mb-2 text-blue-800">AI Task Breakdown</h2>
      <p className="text-xs text-blue-600 mb-3">Tulis kegiatan apapun, AI akan membuatkan checklist untuk kamu!</p>
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border border-blue-300 rounded-lg p-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Contoh: Latihan fisik untuk tes polisi, Belajar React, Diet sehat..."
          value={goal}
          onChange={e => setGoal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleBreakdown()}
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={handleBreakdown}
          disabled={loading}
        >{loading ? "Memproses..." : "Breakdown"}</button>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {results.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-blue-700 font-medium">
              {completedCount}/{results.length} selesai
            </span>
            <button
              className="text-xs text-red-500 hover:text-red-700"
              onClick={clearAll}
            >Hapus Semua</button>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${results.length > 0 ? (completedCount / results.length) * 100 : 0}%` }}
            ></div>
          </div>
          <ul className="space-y-2">
            {results.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleDone(idx)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className={`flex-1 text-sm ${item.done ? 'line-through text-gray-400' : 'text-blue-900'}`}>
                  {item.text}
                </span>
                <button
                  className="text-red-400 hover:text-red-600 text-xs"
                  onClick={() => removeItem(idx)}
                >x</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
