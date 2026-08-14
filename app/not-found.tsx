import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">RaframGo</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-muted">La página que buscas no existe o fue movida.</p>
      <Link href="/" className="mt-6 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
        Volver al inicio
      </Link>
    </div>
  );
}
