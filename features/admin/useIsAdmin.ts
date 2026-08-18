"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase";

/** null = todavía verificando, true/false = resuelto. Mismo admins/{uid} que Mercaue (ver firestore.rules en el repo de Mercaue). */
export function useIsAdmin(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    let active = true;
    void getDoc(doc(getFirebaseFirestore(), "admins", userId))
      .then((snapshot) => {
        if (active) setIsAdmin(snapshot.exists());
      })
      .catch(() => {
        if (active) setIsAdmin(false);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  return isAdmin;
}
