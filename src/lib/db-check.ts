import prisma from './db';

export async function testDbConnection() {
  try {
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Successfully connected to the database.');
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1); // Exit the process if DB is unreachable
  }
}
