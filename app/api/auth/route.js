import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const JWT = 'JVtpxe7ftgeLQrsleRGY3c9YDldWFyuf'
    
    try {
      const { email, password } = await req.json();
      
      const user = await prisma.users.findUnique({
        where: { email },
      });
  
      if (!user || (password != user.password)) {
        return new Response(
          JSON.stringify({ error: 'Verifique suas credenciais e tente novamente.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }      
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT,
        { expiresIn: '3h' }
      );
  
      return new Response(
        JSON.stringify({ token }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
      
    } catch (error) {
      console.log(error.message);
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }