import { Ticket } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TicketStatusBadge from '@/components/ticketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';


interface Props {
  ticket: Ticket
};

const TicketDatail = ({ ticket }: Props) => {

  const generateColor = (value: string): string => {
    if (value === 'OPEN') {
      return 'border-red-500';
    } else if (value === 'CLOSED') {
      return 'border-green-500';
    }
    return 'border-blue-500';
  };

  return (
    <div className='lg:grid lg:grid-cols-4'>
      <Card className={clsx('mx-4 mb-4 lg:col-span-3 lg:mr-4', generateColor(ticket.status))}>
        <CardHeader>
          <div className='flex justify-between mb-3'>
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>Created:{" "}{ticket.createdAt.toLocaleDateString('pt-br', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hourCycle: 'h23',
          })}</CardDescription>
        </CardHeader>
        <CardContent className='prose dark:prose-invert'>
          <ReactMarkdown>
            {ticket.description}
          </ReactMarkdown>
        </CardContent>
        <CardFooter>Updated:{" "}{ticket.updatedAt.toLocaleDateString('pt-br', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          hourCycle: 'h23',
        })}
        </CardFooter>
      </Card>
      <div className='flex flex-col mx-4 lg:flex-col lg:mx-0 gap-2'>
        <Link href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: "default" })}`}>
          Edit Ticket
        </Link>
        <Link href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: "default" })}`}>
          Delete Ticket
        </Link>
      </div>
    </div>
  )
}

export default TicketDatail