"use client";

import { useEffect, useMemo, useState } from "react";
import AddTicketForm from "@/components/AddTicketForm";
import TicketList from "@/components/TicketList";
import type { Ticket } from "@/types/ticket";

export default function CloudDeskDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadTickets() {
    const res = await fetch("/api/tickets");
    const data = await res.json();

    setTickets(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const stats = useMemo(() => {
    return {
      open: tickets.filter((ticket) => ticket.status === "Open").length,
      inProgress: tickets.filter((ticket) => ticket.status === "In Progress")
        .length,
      resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
    };
  }, [tickets]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            CloudDesk
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Cloud-Based IT Support Ticket System
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            A mini cloud-ready help desk application for tracking IT support
            requests, ticket priority, and resolution status.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Open Tickets</p>
              <p className="mt-2 text-3xl font-bold">{stats.open}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">In Progress</p>
              <p className="mt-2 text-3xl font-bold">{stats.inProgress}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Resolved</p>
              <p className="mt-2 text-3xl font-bold">{stats.resolved}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <AddTicketForm setTickets={setTickets} />

          {isLoading ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
              <p className="text-slate-300">Loading tickets...</p>
            </div>
          ) : (
            <TicketList tickets={tickets} setTickets={setTickets} />
          )}
        </div>
      </section>
    </main>
  );
}