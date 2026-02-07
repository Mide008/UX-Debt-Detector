// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { result, productUrl } = body;

    if (!result) {
      return NextResponse.json(
        { error: 'No analysis result provided' },
        { status: 400 }
      );
    }

    const doc = generatePDF(result, productUrl || 'Product Analysis');
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ux-debt-report-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
