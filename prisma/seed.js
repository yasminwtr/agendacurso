const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Inserir usuários
  await prisma.users.createMany({
    data: [
      { name: 'Usuário 1', email: '1@gmail.com', password: '123' },
      { name: 'Usuário 2', email: '2@gmail.com', password: '123' },
    ],
  });

  // Inserir turmas
  const classes = await prisma.courseClass.createMany({
    data: [
      { name: 'Motoristas Bom Sucesso', number: '01', collector: '1007', participants: 12 },
      { name: 'Motoristas Jandaia do Sul', number: '02', collector: '1009', participants: 9 },
      { name: 'Motoristas Marumbi', number: '03', collector: '1018', participants: 9 },
      { name: 'Operadores Bom Sucesso', number: '04', collector: '1023', participants: 18 },
      { name: 'Operadores Jandaia do Sul', number: '05', collector: '1025', participants: 11 },
    ],
  });

  // Inserir salas
  const rooms = await prisma.room.createMany({
    data: [
      { name: 'Sala 01 - RH' },
      { name: 'Sala 02 - LOGÍSTICA' },
      { name: 'Sala 03 - CALDEIRARIA' },
      { name: 'Sala 04 - ASSOCIVAL' },
    ],
  });

  // Inserir tipos de curso
  const courseTypes = await prisma.courseType.createMany({
    data: [
      { name: 'Informática' },
      { name: 'Saúde Mental' },
      { name: 'Educação Financeira' },
      { name: 'Outros' },
    ],
  });
  
}

main()
  .then(() => {
    console.log('Seed data inserted successfully.');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
