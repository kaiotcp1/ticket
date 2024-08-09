"use client";
import React from 'react';
import { Button } from './ui/button';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
};

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    const pageCount = Math.ceil(itemCount / pageSize);
    const router = useRouter();
    const searchParams = useSearchParams();


    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        if (!page) return;

        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className='flex items-center justify-center gap-5 my-4 '>
            <div className='flex gap-2'>
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => changePage(1)}>
                    <ChevronFirst />
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}>
                    <ChevronLeft />
                </Button>
                <div className='mt-2'>
                    <p>
                        Page {currentPage} of {pageCount}
                    </p>
                </div>
                <Button
                    variant="outline"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(currentPage + 1)}>
                    <ChevronRight />
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(pageCount)}>
                    <ChevronLast />
                </Button>
            </div>

        </div>
    )
}

export default Pagination