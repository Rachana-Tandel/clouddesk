"use client";

import { useState } from "react";
import type {
  Ticket,
  TicketCategory,
  TicketPriority,
} from "@/types/ticket";

type AddTicketFormProps = {
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
};

export default function AddTicketForm({ setTickets }: AddTicketFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TicketCategory>("Password");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    setIsSubmitting(true);

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        priority,
        notes,
      }),
    });

    const newTicket = await res.json();

    setTickets((prev) => [newTicket, ...prev]);

    setTitle("");
    setCategory("Password");
    setPriority("Medium");
    setNotes("");
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={addTicket}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          New Ticket
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Create IT Support Ticket
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Track password resets, VPN issues, laptop problems, printer issues,
          and software requests.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Ticket title
          </label>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: VPN not connecting"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as TicketCategory)
              }
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option>Password</option>
              <option>VPN</option>
              <option>Laptop</option>
              <option>Printer</option>
              <option>Software</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TicketPriority)
              }
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add details about the issue..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Adding..." : "Add Ticket"}
        </button>
      </div>
    </form>
  );
}