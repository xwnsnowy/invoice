import prisma from "@/app/utils/db";

export async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });

  return data;
}