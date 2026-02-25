import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ASSEMBLY_API_KEY;
  console.log("api");

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing AssemblyAI API key" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      "https://api.assemblyai.com/v2/realtime/token",
      {
        method: "POST",
        headers: {
          Authorization: apiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expires_in: 3600 }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
