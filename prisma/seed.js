const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Inserir 5 usuários
  await prisma.users.createMany({
    data: [
      { name: 'Yasmin', email: 'user1@example.com', password: 'password1' },
      { name: 'Admin', email: 'user2@example.com', password: 'password2' },
    ],
  });

  // Inserir 5 turmas
  const classes = await prisma.courseClass.createMany({
    data: [
      { name: 'Motoristas Bom Sucesso', number: '01', collector: '1007', participants: 12 },
      { name: 'Motoristas Jandaia do Sul', number: '02', collector: '1009', participants: 9 },
      { name: 'Motoristas Marumbi', number: '03', collector: '1018', participants: 9 },
      { name: 'Operadores Bom Sucesso', number: '04', collector: '1023', participants: 18 },
      { name: 'Operadores Jandaia do Sul', number: '05', collector: '1025', participants: 11 },
    ],
  });

  // Inserir 5 salas
  const rooms = await prisma.room.createMany({
    data: [
      { name: 'Sala 01' },
      { name: 'Sala 02' },
      { name: 'Sala 03' },
      { name: 'Sala 04' },
      { name: 'Sala 05' },
    ],
  });

  // Inserir 5 tipos de curso
  const courseTypes = await prisma.courseType.createMany({
    data: [
      { name: 'Informática' },
      { name: 'Outros' },
    ],
  });

  // function formatDateWithoutSeconds(dateString) {
  //   const date = new Date(dateString);
  //   date.setSeconds(0, 0); 
  //   return date;
  // }
  
  // await prisma.events.createMany({
  //   data: [
  //     { title: 'Agenda 1', start: formatDateWithoutSeconds('2024-11-01T09:00:00Z'), end: formatDateWithoutSeconds('2024-11-01T10:00:00Z'), classId: 1, roomId: 1, courseTypeId: 1 },
  //     { title: 'Agenda 2', start: formatDateWithoutSeconds('2024-11-02T09:00:00Z'), end: formatDateWithoutSeconds('2024-11-02T10:00:00Z'), classId: 2, roomId: 2, courseTypeId: 2 },
  //     { title: 'Agenda 3', start: formatDateWithoutSeconds('2024-11-03T09:00:00Z'), end: formatDateWithoutSeconds('2024-11-03T10:00:00Z'), classId: 3, roomId: 3, courseTypeId: 3 },
  //     { title: 'Agenda 4', start: formatDateWithoutSeconds('2024-11-04T09:00:00Z'), end: formatDateWithoutSeconds('2024-11-04T10:00:00Z'), classId: 4, roomId: 4, courseTypeId: 4 },
  //     { title: 'Agenda 5', start: formatDateWithoutSeconds('2024-11-05T09:00:00Z'), end: formatDateWithoutSeconds('2024-11-05T10:00:00Z'), classId: 5, roomId: 5, courseTypeId: 5 },
  //   ],
  // });
  
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
