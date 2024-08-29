import { Ticket, User } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import DeleteButton from './DeleteButton';
import AssignTicket from '@/components/AssignTicket';
import StatusBadge from '@/components/StatusBadge';
// import TicketStatusBadge from '@/components/TicketStatusBadge';


interface Props {
  ticket: Ticket;
  users: User[];
};

const TicketDatail = ({ ticket, users }: Props) => {

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
            <StatusBadge status={ticket.status} />
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
        <AssignTicket ticket={ticket} users={users} />
        <Link href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: "default" })}`}>
          Edit Ticket
        </Link>
        <DeleteButton ticketId={ticket.id} />
      </div>
    </div>
  )
}

export default TicketDatail