"use client";

import { useEffect, useState } from "react";
import { getCountryStats } from "@/lib/community/service";
import type { CountryStat } from "@/lib/community/types";

/** null mientras carga, arreglo vacío si no hay datos todavía. */
export function useCountryStats() {
  const [stats, setStats] = useState<CountryStat[] | null>(null);

  useEffect(() => {
    let active = true;
    getCountryStats().then((result) => {
      if (active) setStats(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return stats;
}
