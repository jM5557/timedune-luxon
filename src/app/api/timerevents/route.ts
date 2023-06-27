import prisma from "@localprisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  const events = await prisma.timerEvent.findMany({
    where: {
      User: {
        email: session?.user?.email
      }
    },
    include: {
      User: true
    }
  });

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log(json);
    const session = await getServerSession(authOptions);

    const timerEvent = await prisma.timerEvent.create({
      data: {
        ...json,
        User: {
          connect: {
            email: session?.user?.email
          }
        }
      },
      include: {
        User: true
      }
    });

    return new NextResponse(JSON.stringify(timerEvent), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log(error.message);
    if (error.code === "P2002") {
      return new NextResponse("TimerEvent could not be added", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}