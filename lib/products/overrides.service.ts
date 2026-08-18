import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase";
import type { ProductStatus } from "./types";

/**
 * portalProducts/{id}: los únicos campos de un producto que un admin puede
 * cambiar sin tocar código (estado, orden, URL de la app) — ver
 * firestore.rules (isValidPortalProduct) en el repo de Mercaue. El nombre,
 * descripción, funcionalidades, etc. siguen viviendo en lib/products/data.ts
 * y en las traducciones: son contenido versionado, no configuración.
 */
export type ProductOverride = {
  status: ProductStatus;
  displayOrder: number;
  applicationUrl: string;
};

function mapOverride(data: Record<string, unknown> | undefined): ProductOverride | null {
  if (!data) return null;
  return {
    status: data.status as ProductStatus,
    displayOrder: data.displayOrder as number,
    applicationUrl: data.applicationUrl as string,
  };
}

class ProductOverridesService {
  async getAll(): Promise<Record<string, ProductOverride>> {
    try {
      const snapshot = await getDocs(collection(getFirebaseFirestore(), "portalProducts"));
      const result: Record<string, ProductOverride> = {};
      snapshot.forEach((item) => {
        const mapped = mapOverride(item.data());
        if (mapped) result[item.id] = mapped;
      });
      return result;
    } catch {
      // Sin conexión o colección todavía sin inicializar: el portal sigue
      // funcionando con los valores estáticos de lib/products/data.ts.
      return {};
    }
  }

  async get(productId: string): Promise<ProductOverride | null> {
    const snapshot = await getDoc(doc(getFirebaseFirestore(), "portalProducts", productId));
    return mapOverride(snapshot.data());
  }

  /** Solo puede llamarlo un admin (ver firestore.rules); crea o reemplaza el override completo. */
  async save(productId: string, override: ProductOverride) {
    await setDoc(doc(getFirebaseFirestore(), "portalProducts", productId), {
      ...override,
      updatedAt: serverTimestamp(),
    });
  }
}

const productOverridesService = new ProductOverridesService();

export default productOverridesService;
