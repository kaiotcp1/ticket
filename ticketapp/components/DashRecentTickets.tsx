import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import TicketPriority from './TicketPriority';
// import TicketStatusBadge from './TicketStatusBadge';
import StatusBadge from './StatusBadge';

type TicketWithUser = Prisma.TicketGetPayload<{
    include: { assignedToUser: true };
}>;

interface Props {
    tickets: TicketWithUser[];
};

const DashRecentTickets = ({ tickets }: Props) => {
    return (
        <Card className='col-span-3'>
            <CardHeader>
                <CardTitle>Recently Updated</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-8'>
                    {tickets ? tickets.map((ticket) => (
                        <div className='flex items-center' key={ticket.id}>
                            <StatusBadge status={ticket.status} />
                            <div className='ml-4 space-y-1'>
                                <Link href={`tickets/${ticket.id}`}>
                                    <p>{ticket.title}</p>
                                    <p>{ticket.assignedToUser?.name || 'Unassigned'}</p>
                                </Link>
                            </div>
                            <div className='ml-auto font-medium'>
                                <TicketPriority priority={ticket.priority} />
                            </div>
                        </div>
                    )) : null}
                </div>
            </CardContent>
        </Card>
    )
}

export default DashRecentTickets