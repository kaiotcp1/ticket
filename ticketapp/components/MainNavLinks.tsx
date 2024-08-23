"use client";
import { link } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type MainNavLinksProps = {
    label: string;
    href: string;
    adminOnly?: boolean;
};

const MainNavLinks = ({ role }: { role?: string }) => {
    const links: MainNavLinksProps[] = [
        { label: "Dashboard", href: "/", adminOnly: false },
        { label: "Tickets", href: "/tickets", adminOnly: false },
        { label: "Users", href: "/users", adminOnly: true },
    ];

    const currentPath = usePathname();

    return (
        <div className="flex items-center gap-5">
            {links.filter((link) => !link.adminOnly || role === 'ADMIN').map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className={`navbar-link ${currentPath == link.href && "cursor-default text-primary/70 hover:text-primary/60"}`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    )
}
export default MainNavLinks;
