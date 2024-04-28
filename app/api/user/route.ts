import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from 'zod'
import { hashPassword } from "@/lib/utils";

const userSchema = z.object({
  username: z.string().min(1, "username is required").max(100),
  email: z.string().min(6, "email is required").email('Invalid emai'),
  password: z.string().min(1, "password is required").min(6, "password must have more than 6 characters")
})

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    const existingUserEmail = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUserEmail) {
      return NextResponse.json({
        user: null,
        status: 409,
        message: 'user email already exists'
      })
    }
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    });
    if (existingUsername) {
      return NextResponse.json({
        user: null,
        status: 409,
        message: 'username already exists'
      })
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword(password)
      }
    })
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({
      user: rest,
      message: 'user create successfully',
      status: 201
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error, status: 500 });
  }
}