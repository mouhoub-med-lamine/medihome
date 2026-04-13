import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { userId, location } = await request.json()

    // Simulated emergency response
    return NextResponse.json({
        success: true,
        requestId: 'req-emergency-' + Date.now()
    })
}
