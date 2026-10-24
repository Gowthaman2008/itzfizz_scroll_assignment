// Outer .stat = intro animation (load). Inner .stat-inner = scroll animation.
// Split in two so the two animations never fight over the same transform.
export default function StatCard({ value, label }) {
  return (
    <div className="stat">
      <div className="stat-inner rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-6">
        <div className="text-3xl font-bold text-[color:var(--accent)] sm:text-5xl">{value}</div>
        <p className="mt-2 text-xs leading-snug text-white/60 sm:text-sm">{label}</p>
      </div>
    </div>
  );
}
