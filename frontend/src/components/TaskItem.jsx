export default function TaskItem({ text, duration, completedAt }) {
  return (
    <div className="bg-white p-4 rounded-lg text-gray-800 shadow">
      <div className="font-semibold">{text}</div>
      {duration && (
        <div className="text-sm text-gray-600 mt-2">
          ⏱️ Durasi: {duration} menit
          {completedAt && (
            <div className="text-xs text-gray-500 mt-1">
              Selesai: {completedAt}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
