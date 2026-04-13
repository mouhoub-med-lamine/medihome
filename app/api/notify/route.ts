import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { type, userId, message } = await request.json()

    // Integration with Resend or Twilio would go here
    console.log(`[Notification] To ${userId}: ${message} (${type})`)

    return NextResponse.json({ success: true })
}
