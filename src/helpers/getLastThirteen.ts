import { type Ticket } from '../models/ticket';

interface Response {
  ok: boolean;
  lastThirteen: Ticket[];
}

export const getLastThirteen = async (): Promise<Response> => {
  const lastTickets = await fetch('http://localhost:8080/api/last-thirteen');
  return await lastTickets.json();
};
