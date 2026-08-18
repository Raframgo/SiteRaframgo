import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase";
import type { ContactSubmission, NewContactSubmission } from "./types";

function toMillis(value: unknown): number | null {
  return value instanceof Timestamp ? value.toMillis() : null;
}

function mapSubmission(id: string, data: Record<string, unknown>): ContactSubmission {
  return {
    id,
    name: data.name as string,
    email: data.email as string,
    message: data.message as string,
    product: (data.product as string | undefined) ?? null,
    createdAt: toMillis(data.createdAt),
    read: (data.read as boolean | undefined) ?? false,
  };
}

/**
 * Backend real (sin servidor propio) del formulario de contacto: los
 * mensajes quedan guardados en contactSubmissions (ver firestore.rules en
 * el repo de Mercaue) y un admin los revisa desde /admin/mensajes. No hay
 * envío automático de correo (no hay Cloud Functions en este proyecto): el
 * mailto directo sigue disponible como alternativa inmediata en /contacto.
 */
class ContactService {
  async submit(input: NewContactSubmission) {
    await addDoc(collection(getFirebaseFirestore(), "contactSubmissions"), {
      name: input.name,
      email: input.email,
      message: input.message,
      product: input.product ?? null,
      createdAt: serverTimestamp(),
      read: false,
    });
  }

  /** Solo un admin puede listarlos (ver firestore.rules). */
  async listAll(): Promise<ContactSubmission[]> {
    const submissionsQuery = query(collection(getFirebaseFirestore(), "contactSubmissions"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(submissionsQuery);
    return snapshot.docs.map((item) => mapSubmission(item.id, item.data()));
  }

  async markRead(id: string, read: boolean) {
    await updateDoc(doc(getFirebaseFirestore(), "contactSubmissions", id), { read });
  }
}

const contactService = new ContactService();

export default contactService;
