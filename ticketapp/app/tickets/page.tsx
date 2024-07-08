import React from "react";
import prisma from '@/prisma/db';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  console.log(tickets);

  return <div>

    {tickets.map((ticket) => (
      <div key={ticket.id}>{ticket.title}</div>
    ))}
  </div>;
};

export default Tickets;
