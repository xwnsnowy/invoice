import { z } from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(2, "Address is required"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is required"),
  total: z.number().min(1, "1$ is minimum"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(1, "Due Date is required"),
  fromName: z.string().min(1, "From Name is required"),
  fromEmail: z.string().email("From Email is invalid"),
  fromAddress: z.string().min(1, "From Address is required"),
  clientName: z.string().min(1, "Client Name is required"),
  clientEmail: z.string().email("Client Email is invalid"),
  clientAddress: z.string().min(1, "Client Address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNumber: z.number().min(1, "Invoice Number min 1"),
  note: z.string().optional(),
  invoiceItemDescrption: z.string().min(1, "Invoice Item Description is required"),
  invoiceItemQuantity: z.number().min(1, "Invoice Item Quantity min 1"),
  invoiceItemRate: z.number().min(1, "Invoice Item Rate min 1"),
})