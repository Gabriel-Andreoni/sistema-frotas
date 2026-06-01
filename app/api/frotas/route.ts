import { NextRequest, NextResponse } from "next/server";


const frotas: string[] = [];

export async function GET() {
    return NextResponse.json(frotas);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    frotas.push(...body);

    return NextResponse.json({ message: "Frotas cadastradas" });
}