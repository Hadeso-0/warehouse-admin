import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {

    try{
        const body = await req.json();
        const { name, email, password } = body;
        console.log (body);
        
        if(!name || !email || !password) {
            return new NextResponse("Missing name, email, or password", { status: 400 });
        }
        const exist = await prismadb.user.findUnique({
            where: {
                email: email
            }
        });
        
        if(exist){
            return new NextResponse("User already exists", { status: 400 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prismadb.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json(user);
    }
    catch(error){
        return new NextResponse("Something went Wrong", { status: 500 });
    }
}
