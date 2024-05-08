import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

async function prismaDisconnect() {
  try {
    const prismaDisconnect = await prisma.$disconnect();
    // console.log("Disconnected");
  } catch (error) {
    console.error(error);
  }
}
export { prismaDisconnect };

export default prisma;
