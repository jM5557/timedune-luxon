import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@localprisma/prisma';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH0_SECRET,
    events: {
      signIn: async ({ user }) => {
        let result = await prisma.userPreference.findUnique({
          where: {
            userId: Number(user.id)
          },
          select: {
            defaultTimezoneId: true
          }
        });

        if (!result) {
          await prisma.userPreference.create({
            data: {
              defaultTimezoneId: 0,
              User: {
                connect: {
                  id: Number(user.id)
                }
              }
            }
          });
        }
      }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
