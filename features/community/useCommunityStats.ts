"use client";

import { useEffect, useState } from "react";
import { getCommunityStats } from "@/lib/community/service";
import type { CommunityStats } from "@/lib/community/types";

/** null mientras carga, undefined si no se pudo obtener (sin conexión, no inicializado todavía en Mercue, etc.). */
export function useCommunityStats() {
  const [stats, setStats] = useState<CommunityStats | null | undefined>(null);

  useEffect(() => {
    let active = true;
    getCommunityStats().then((result) => {
      if (active) setStats(result ?? undefined);
    });
    return () => {
      active = false;
    };
  }, []);

  return stats;
}
