"use client";

import { createInvoice } from "@/app/action";
import { formatCurrency } from "@/app/utils/formatCurrenct";
import { invoiceSchema } from "@/app/utils/zodSchema";
import { SubmitButton } from "@/components/SubmitButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar1Icon } from "lucide-react";
import { useActionState, useMemo, useState } from "react";

// const ErrorMessage = ({ errors }: { errors?: string[] }) => {
//   console.log(errors);

//   return errors && errors.length > 0 ? (
//     <ul className="text-sm text-red-500">
//       {errors.map((error, index) => (
//         <li key={index}>{error}</li>
//       ))}
//     </ul>
//   ) : null;
// };

export function CreateInvoice() {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");

  const calculateTotal = useMemo(
    () => (Number(quantity) || 0) * (Number(rate) || 0),
    [quantity, rate]
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            key={fields.date.key}
            value={selectedDate.toISOString()}
          />
          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-1">
              <Badge variant={"secondary"}>Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Enter a name..."
              />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 flex items-center border-r-0 rounded-l-md bg-muted gap-1">
                  #
                </span>
                <Input
                  placeholder="5"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                />
              </div>
              <p className="text-sm text-red-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <Select
                defaultValue="USD"
                name="fields.currency.name"
                key="fields.currency.key"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.currency.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-2 mb-6">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Your Name"
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={fields.fromName.initialValue}
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Mail"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={fields.fromEmail.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>
              </div>
              <Input
                placeholder="Your Address"
                name={fields.fromAddress.name}
                key={fields.fromAddress.key}
                defaultValue={fields.fromAddress.initialValue}
              />
              <p className="text-sm text-red-500">
                {fields.fromAddress.errors}
              </p>
            </div>

            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder="Client Name"
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder="Client Mail"
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder="Client Address"
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Calendar1Icon />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-red-500">{fields.date.errors}</p>
            </div>

            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2 ">Amount</p>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  name={fields.invoiceItemDescrption.name}
                  key={fields.invoiceItemDescrption.key}
                  defaultValue={fields.invoiceItemDescrption.initialValue}
                  placeholder="Item name & description"
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  type="number"
                  placeholder="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency(calculateTotal)}
                  type="text"
                  placeholder="0"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>{formatCurrency(calculateTotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total (UDS)</span>
                <span className="underline underline-offset-2">
                  {formatCurrency(calculateTotal)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder="Add your notes here..."
            />
            <p className="text-sm text-red-500">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Send Invoice to client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
