import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const prescriptionId = searchParams.get('id')

    if (!prescriptionId) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    return NextResponse.json({
        message: 'PDF Generation logic active (Mock)',
        id: prescriptionId,
        patient: 'Alice Martin'
    })
}
