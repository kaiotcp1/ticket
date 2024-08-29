import { Status } from '@prisma/client';
import React from 'react'
import { Badge } from './ui/badge';

interface Props {
    status: Status;
}

const StatusBadge = ({ status }: Props) => {
    return (
        <div>
            <Badge>
                <p>{status}</p>
            </Badge>
        </div>
    )
}

export default StatusBadge