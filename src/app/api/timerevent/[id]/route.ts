import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@localprisma/prisma";

export const DELETE = async (request: Request, { params }: any) => {
    // You should use try catch here
    
    // Get param named id from query params
    const { id } = params;
    // Output our ID to console
    console.log("ID", id);
    
    try {
        const session = await getServerSession(authOptions);
    
        const timerEvent = await prisma.timerEvent.delete({
          where: {
            id: Number(id)
          }
        });
    
        return new NextResponse(JSON.stringify(timerEvent), { 
         status: 201, 
         headers: { "Content-Type": "application/json" },
        });
      } catch (error: any) {
        console.log(error.message);
        if (error.code === "P2002") {
          return new NextResponse("TimerEvent could not be deleted", {
            status: 409,
          });
        }
        return new NextResponse(error.message, { status: 500 });
      }
};