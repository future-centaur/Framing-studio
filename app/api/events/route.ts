/**
 * POST /api/events
 * Records configuration_started and configuration_completed events
 * E-3: Dual success metric — start → complete rate
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { ConversionEventType } from '@prisma/client';

const EventSchema = z.object({
  type: z.enum(['configuration_started', 'configuration_completed']),
  sessionId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = EventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const eventType =
      parsed.data.type === 'configuration_started'
        ? ConversionEventType.CONFIGURATION_STARTED
        : ConversionEventType.CONFIGURATION_COMPLETED;

    await db.conversionEvent.create({
      data: {
        type: eventType,
        sessionId: parsed.data.sessionId,
      },
    });

    return NextResponse.json({ recorded: true });
  } catch (err) {
    console.error('[POST /api/events]', err);
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
