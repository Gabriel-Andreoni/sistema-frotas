import { NextRequest, NextResponse } from "next/server";


const frotas: string[] = [];

export async function GET() {
    return NextResponse.json(frotas);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    if(frotas.length == 1) {
        frotas.shift();
        frotas.push(body);
    } else {
        frotas.push(body);
    }

    return NextResponse.json({ message: "Frotas cadastradas" });
}