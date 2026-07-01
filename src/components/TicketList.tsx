"use client";

import type { Ticket, TicketStatus } from "@/types/ticket";

type TicketListProps = {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
};

export default function TicketList({ tickets, setTickets }: TicketListProps) {
  async function updateStatus(id: number, status: TicketStatus) {
    const res = await fetch(`/api/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    const updatedTicket = await res.json();

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? updatedTicket : ticket
      )
    );
  }

  async function deleteTicket(id: number) {
    await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });

    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  }

  if (tickets.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
        <p className="text-lg font-semibold text-white">No tickets yet</p>
        <p className="mt-2 text-sm text-slate-400">
          Create your first IT support ticket to start tracking requests.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{ticket.title}</h3>

              <p className="mt-1 text-sm text-slate-400">
                {ticket.category} • {ticket.priority} Priority • Created{" "}
                {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                ticket.status === "Open"
                  ? "bg-blue-400/10 text-blue-300"
                  : ticket.status === "In Progress"
                  ? "bg-yellow-400/10 text-yellow-300"
                  : "bg-green-400/10 text-green-300"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {ticket.notes && (
            <p className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm text-slate-300">
              {ticket.notes}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => updateStatus(ticket.id, "Open")}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-400 hover:text-blue-300"
            >
              Open
            </button>

            <button
              onClick={() => updateStatus(ticket.id, "In Progress")}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-yellow-400 hover:text-yellow-300"
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus(ticket.id, "Resolved")}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-green-400 hover:text-green-300"
            >
              Resolved
            </button>

            <button
              onClick={() => deleteTicket(ticket.id)}
              className="rounded-xl border border-red-500/40 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}