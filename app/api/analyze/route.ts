import { analyzeUXDebt } from "@/lib/analysis-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await analyzeUXDebt(body);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}