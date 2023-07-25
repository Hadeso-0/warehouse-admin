import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from '@/lib/prismadb';
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

const randomValueHex = (len : number) => {
  return crypto.randomBytes(Math.ceil(len/2))
      .toString('hex')
      .slice(0,len).toUpperCase();
}
export const options : NextAuthOptions = {
    //@ts-ignore
    adapter: PrismaAdapter(prismadb),
    providers: [
        CredentialsProvider({
            name: 'sign-in',
            credentials: {
              email: { label: "email", type: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              try {
                console.log(credentials);
                if(!credentials?.email || !credentials.password){
                  return null;
                }

                const user = await prismadb.user.findUnique({
                  where:{
                    email : credentials.email,
                  }
                })

                if(!user){
                  return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                if(!passwordMatch) return null;

                return user;
              } catch (err) {
                console.log("ERROR", err);
                throw err;
              }
            }
          }),
          // GoogleProvider({
          //   clientId: process.env.GOOGLE_CLIENT_ID || '',
          //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
          // })
    ],
    callbacks: {
      async session({session, token}) {
          session.user = token.user as User;
          return session;
      },
      async signIn({profile}) {
        try{
            console.log(profile)
            if(!profile) return false;
            if(!profile.email|| !profile.name || !profile.image) return false;

            const userExists = await prismadb.user.findUnique({
              where:{
                email : profile.email,
              }
            })

            if(!userExists){
              const user = await prismadb.user.create({
                data: {
                  name: profile.name,
                  email: profile.email,
                  password: randomValueHex(4)+"-"+randomValueHex(4)+"-"+randomValueHex(4)
                }
              });
            }

            return true;
        }
        catch(error){
          console.log("Server Error");
          return false;
        }
      },
      async jwt({ token, user }) {
          if (token && user) {
            token.user = user;
          }
          return token;
      }
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
      signIn: '/sign-in',
      signOut: '/sign-in',
      error: '/api/auth/error',
    }
}