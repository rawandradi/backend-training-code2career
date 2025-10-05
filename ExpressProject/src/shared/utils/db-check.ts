import { prisma } from "../prisma";

(async () => {
  try {
    const users = await prisma.user.count();
    console.log("✅ Prisma connected to MongoDB. users count =", users);
  } catch (err) {
    console.error("❌ Prisma connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
})();
