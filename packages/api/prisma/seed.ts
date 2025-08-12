import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing books
  await prisma.book.deleteMany();

  console.log('Seeding database with sample books...');
  await prisma.book.createMany({
    data: [
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        description: 'A fantasy novel and prelude to The Lord of the Rings.',
        isbn: '978-0345339683',
      },
      {
        title: 'Foundation',
        author: 'Isaac Asimov',
        description: 'The first book in the epic Foundation series.',
        isbn: '978-0553803719',
      },
    ],
  });
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
