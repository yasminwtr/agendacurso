import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const classes = await prisma.courseType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return new Response(JSON.stringify(classes), {
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