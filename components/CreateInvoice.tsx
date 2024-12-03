"use client";

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
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar1Icon } from "lucide-react";
import { useState } from "react";

export function CreateInvoice() {
  const [selectedState, setSelectedState] = useState(new Date());
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1 w-fit mb-6">
          <div className="flex items-center gap-1">
            <Badge variant={"secondary"}>Draft</Badge>
            <Input placeholder="Enter a name..." />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label>Invoice No.</Label>
            <div className="flex">
              <span className="px-3 flex items-center border-r-0 rounded-l-md bg-muted gap-1">
                #
              </span>
              <Input placeholder="5" className="rounded-l-none" />
            </div>
          </div>

          <div>
            <Label>Currency</Label>
            <Select>
              <SelectTrigger defaultValue="usd">
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">United States Dollar -- USD</SelectItem>
                <SelectItem value="eur">Euro -- EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2 mb-6">
          <div>
            <Label>From</Label>
            <div className="space-y-2">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Mail" />
            </div>
            <Input placeholder="Your Address" />
          </div>

          <div>
            <Label>To</Label>
            <div className="space-y-2">
              <Input placeholder="Client Name" />
              <Input placeholder="Client Mail" />
              <Input placeholder="Client Address" />
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
                  {selectedState ? (
                    new Intl.DateTimeFormat("en-US", {
                      dateStyle: "long",
                    }).format(selectedState)
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  selected={selectedState}
                  onSelect={(date) => setSelectedState(date || new Date())}
                  mode="single"
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Invoice Due</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on Reciept</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
            <p className="col-span-6">Description</p>
            <p className="col-span-2">Qunatity</p>
            <p className="col-span-2">Rate</p>
            <p className="col-span-2 ">Amount</p>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6">
              <Textarea placeholder="Item name & description" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" disabled />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span>Total (UDS)</span>
              <span className="underline underline-offset-2">$5.00</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Note</Label>
          <Textarea placeholder="Add your notes here..." />
        </div>

        <div className="flex items-center justify-end mt-6">
          <div>
            <SubmitButton text="Send Invoice to client" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
