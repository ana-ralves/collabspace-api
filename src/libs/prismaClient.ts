import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error"],
});

export { prisma };

// npx prisma db pull
//  npx prisma generate (sempre usar prisma generate a cada modificação no banco de dados)
