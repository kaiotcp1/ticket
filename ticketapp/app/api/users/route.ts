import prisma from "@/prisma/db";
import { userSchema } from "@/ValidationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

     const session = await getServerSession(options);

     if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

     if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Only Admins Can Create Users.' }, { status: 401 });

    const body: User = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

    const duplicate = await prisma.user.findUnique({
        where: {
            username: body.username
        },
    });

    if (duplicate) return NextResponse.json({ message: 'Duplicate Username' }, { status: 400 });

    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;

    const newUser = await prisma.user.create({
        data: {
            ...body
        },
    });

    const { password, ...user } = newUser;

    return NextResponse.json(user, { status: 201 });
};