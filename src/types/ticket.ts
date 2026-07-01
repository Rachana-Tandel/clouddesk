export type TicketStatus = "Open" | "In Progress" | "Resolved";

export type TicketPriority = "Low" | "Medium" | "High";

export type TicketCategory =
  | "Password"
  | "VPN"
  | "Laptop"
  | "Printer"
  | "Software"
  | "Other";

export type Ticket = {
  id: number;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  notes: string;
  createdAt: string;
};