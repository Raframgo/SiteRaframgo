"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import contactService from "@/lib/contact/service";
import type { ContactSubmission } from "@/lib/contact/types";

function formatDate(millis: number | null) {
  if (!millis) return "—";
  return new Date(millis).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

function MessagesAdmin() {
  const [messages, setMessages] = useState<ContactSubmission[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    void contactService
      .listAll()
      .then(setMessages)
      .catch(() => setError(true));
  }, []);

  async function toggleRead(message: ContactSubmission) {
    const nextRead = !message.read;
    setMessages((prev) => prev?.map((item) => (item.id === message.id ? { ...item, read: nextRead } : item)) ?? prev);
    try {
      await contactService.markRead(message.id, nextRead);
    } catch {
      setMessages((prev) => prev?.map((item) => (item.id === message.id ? { ...item, read: !nextRead } : item)) ?? prev);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Mensajes</h1>
      <p className="mt-1 text-sm text-muted">Mensajes enviados desde el formulario de contacto del portal.</p>

      {error && <p className="mt-8 text-sm text-red-600">No se pudieron cargar los mensajes.</p>}

      {!error && messages === null && <p className="mt-8 text-sm text-muted">Cargando…</p>}

      {messages !== null && messages.length === 0 && (
        <p className="mt-8 text-sm text-muted">Todavía no hay mensajes.</p>
      )}

      {messages !== null && messages.length > 0 && (
        <div className="mt-8 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl border p-6 ${message.read ? "border-slate-200 bg-white" : "border-brand bg-brand/5"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-900">{message.name}</p>
                  <a href={`mailto:${message.email}`} className="text-sm text-brand hover:underline">
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">{formatDate(message.createdAt)}</span>
                  <button
                    type="button"
                    onClick={() => void toggleRead(message)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {message.read ? "Marcar sin leer" : "Marcar leído"}
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminGuard>
      <MessagesAdmin />
    </AdminGuard>
  );
}
