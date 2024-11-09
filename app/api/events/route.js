import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.$queryRaw`
      SELECT
        e.id,
        e.title,
        e."roomId",
        r.name AS "roomName",
        e."classId",
        CONCAT('Turma ', c."number", ' - ', c.name) AS "className",
        e."courseTypeId",
        TO_CHAR(e.start, 'YYYY-MM-DD HH24:MI') AS start,
        TO_CHAR(e."end", 'YYYY-MM-DD HH24:MI') AS "end"
      FROM events e
      INNER JOIN room r ON e."roomId" = r.id
      INNER JOIN "courseClass" c ON e."classId" = c.id
    `;
  
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const event = await req.json();
    const newEvent = await prisma.events.create({
      data: {
        title: event.title,
        start: event.start,
        end: event.end,
        roomId: event.roomId,
        classId: event.classId,
        courseTypeId: event.courseTypeId,
      },
    });

    return new Response(JSON.stringify(newEvent), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
