export default function Stats({ sessions }) {
  return (
   <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
  <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-2">
    Statistik Hari Ini
  </h3>

  <p className="text-2xl font-semibold text-white">
    {sessions}
  </p>

  <p className="text-sm text-zinc-400">
    sesi fokus selesai
  </p>
</div>

  );
}
