export default function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl font-bold text-brand">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
