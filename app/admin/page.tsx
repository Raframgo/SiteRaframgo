"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase";
import { getAvailableProducts } from "@/lib/products/data";
import contactService from "@/lib/contact/service";
import type { CommunityStats } from "@/lib/community/types";

async function getStats(): Promise<CommunityStats | null> {
  try {
    const snapshot = await getDoc(doc(getFirebaseFirestore(), "communityStats", "summary"));
    const data = snapshot.data();
    if (!data) return null;
    return {
      totalUsers: (data.totalUsers as number | undefined) ?? 0,
      totalRatings: (data.totalRatings as number | undefined) ?? 0,
      scoreSum: (data.scoreSum as number | undefined) ?? 0,
      scoreDist1: (data.scoreDist1 as number | undefined) ?? 0,
      scoreDist2: (data.scoreDist2 as number | undefined) ?? 0,
      scoreDist3: (data.scoreDist3 as number | undefined) ?? 0,
      scoreDist4: (data.scoreDist4 as number | undefined) ?? 0,
      scoreDist5: (data.scoreDist5 as number | undefined) ?? 0,
      publishedReviewsCount: (data.publishedReviewsCount as number | undefined) ?? 0,
      listsCreatedCount: (data.listsCreatedCount as number | undefined) ?? 0,
      purchasesRegisteredCount: (data.purchasesRegisteredCount as number | undefined) ?? 0,
    };
  } catch {
    return null;
  }
}

function AdminDashboard() {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const productCount = getAvailableProducts().length;

  useEffect(() => {
    let active = true;
    void getStats().then((value) => active && setStats(value));
    void contactService
      .listAll()
      .then((items) => active && setUnreadCount(items.filter((item) => !item.read).length))
      .catch(() => active && setUnreadCount(null));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Resumen</h1>
      <p className="mt-1 text-sm text-muted">Vista general del portal RaframGo.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/admin/productos" className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand">
          <p className="text-sm text-muted">Productos publicados</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{productCount}</p>
        </Link>

        <Link href="/admin/mensajes" className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand">
          <p className="text-sm text-muted">Mensajes sin leer</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{unreadCount ?? "—"}</p>
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-muted">Usuarios totales (aMerkar)</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats?.totalUsers ?? "—"}</p>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted">
        Las estadísticas y reseñas se administran desde /admin/resenas en el proyecto aMerkar, no aquí. Este panel
        gestiona únicamente contenido propio del portal: productos, mensajes de contacto.
      </p>
    </div>
  );
}

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}
