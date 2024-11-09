import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const classes = await prisma.courseClass.findMany({
      orderBy: {
        id: 'asc',
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

export async function POST(req) {
  try {
    const classs = await req.json();
    const newClass = await prisma.courseClass.create({
      data: {
        name: classs.name,
        number: classs.number,
        collector: classs.collector,
        participants: classs.participants
      },
    });

    return new Response(JSON.stringify(newClass), {
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

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updates = await req.json();

    const updatedClass = await prisma.courseClass.update({
      where: { id: Number(id) },
      data: updates,
    });

    return new Response(JSON.stringify({ message: 'Class updated successfully', updatedClass }), {
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

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedClass = await prisma.courseClass.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Class deleted successfully', deletedClass }), {
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