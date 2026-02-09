import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

export default function ProgressChart({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Visual Progress</h2>
        <p className="text-gray-400 text-center py-8">Selesaikan task untuk melihat grafik progress</p>
      </div>
    );
  }

  // === Data per hari (7 hari terakhir) ===
  const dailyData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    const dayTasks = tasks.filter((t) => {
      if (!t.completedAt) return false;
      // Parse various id-ID formats: "DD/MM/YYYY HH:mm:ss" or "D/M/YYYY, HH.mm.ss"
      const cleaned = t.completedAt.replace(",", "").trim();
      const parts = cleaned.split(" ")[0];
      if (!parts) return false;
      const segments = parts.split("/").map(Number);
      if (segments.length < 3) return false;
      const [day, month, year] = segments;
      if (!day || !month || !year) return false;
      return (
        day === date.getDate() &&
        month === date.getMonth() + 1 &&
        year === date.getFullYear()
      );
    });
    const totalMinutes = dayTasks.reduce((sum, t) => sum + (t.duration || 0), 0);
    dailyData.push({
      name: dateStr,
      tasks: dayTasks.length,
      menit: totalMinutes,
    });
  }

  // === Data total ===
  const totalTasks = tasks.length;
  const totalMinutes = tasks.reduce((sum, t) => sum + (t.duration || 0), 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainMinutes = totalMinutes % 60;

  // === Top 5 task terlama ===
  const topTasks = [...tasks]
    .filter((t) => t.duration)
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5)
    .map((t) => ({
      name: t.name.length > 15 ? t.name.slice(0, 15) + "..." : t.name,
      menit: t.duration,
    }));

  // === Pie chart: distribusi hari ini vs minggu ini ===
  const today = new Date();
  const todayTasks = tasks.filter((t) => {
    if (!t.completedAt) return false;
    const cleaned = t.completedAt.replace(",", "").trim();
    const parts = cleaned.split(" ")[0];
    if (!parts) return false;
    const segments = parts.split("/").map(Number);
    if (segments.length < 3) return false;
    const [day, month, year] = segments;
    return day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();
  });
  const todayMinutes = todayTasks.reduce((sum, t) => sum + (t.duration || 0), 0);
  const weekMinutes = dailyData.reduce((sum, d) => sum + d.menit, 0);

  const pieData = [
    { name: "Hari Ini", value: todayMinutes || 0 },
    { name: "Minggu Ini", value: Math.max(weekMinutes - todayMinutes, 0) },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Visual Progress</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
          <p className="text-xs text-blue-500">Total Task</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-600">
            {totalHours > 0 ? `${totalHours}j ${remainMinutes}m` : `${totalMinutes}m`}
          </p>
          <p className="text-xs text-green-500">Total Waktu</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">{todayTasks.length}</p>
          <p className="text-xs text-purple-500">Hari Ini</p>
        </div>
      </div>

      {/* Bar Chart - Task per hari */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">📅 Task 7 Hari Terakhir</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              formatter={(value, name) => [value, name === "tasks" ? "Task" : "Menit"]}
            />
            <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Task" />
            <Bar dataKey="menit" fill="#10b981" radius={[4, 4, 0, 0]} name="Menit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        {weekMinutes > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">⏰ Distribusi Waktu</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}m`}
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} menit`]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Tasks */}
        {topTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">🏆 Top 5 Task Terlama</h3>
            <div className="space-y-2">
              {topTasks.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center px-2"
                      style={{
                        width: `${Math.min((t.menit / topTasks[0].menit) * 100, 100)}%`,
                        backgroundColor: COLORS[i],
                      }}
                    >
                      <span className="text-xs text-white truncate">{t.name}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">{t.menit}m</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
