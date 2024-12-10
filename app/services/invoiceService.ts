import prisma from "@/app/utils/db";
import { notFound, redirect } from "next/navigation";

export async function getUserInvoices(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function getInvoiceByUser(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },

  });

  if (!data) {
    return notFound();
  }

  return data;
}

export async function authorizeInvoice(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

export async function getInvoicesData(userId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [data, pendingInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        id: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    pendingInvoices,
    paidInvoices,
  };
}

export async function getUserInvoicesByDate(userId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const data = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        gte: thirtyDaysAgo
      }
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    }
  })

  const aggregatedData = data.reduce(
    (accumulator: { [key: string]: number }, current) => {
      const date = new Date(current.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })

      accumulator[date] = (accumulator[date] || 0) + current.total;

      return accumulator;
    }, {});

  const transformedData = Object.entries(aggregatedData)
    .reduce((acc: Array<{ date: string; total: number; originalDate: Date }>, [date, amount]) => {
      const originalDate = new Date(date + ", " + new Date().getFullYear());
      acc.push({ date, total: amount, originalDate });
      return acc;
    }, [])
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, total }) => ({ date, total }));

  return transformedData;
}