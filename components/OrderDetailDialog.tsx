"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Order } from "@/sanity.types";

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
const OrderDetailDialog = ({ order, isOpen, onClose }: Props) => {
  if (!order) return null;
  const formatPrice = (amount: number, currency: string = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100); // تحويل من سنتات إلى دولار

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order #{order?.orderNumber}</DialogTitle>
          <DialogDescription>
            Placed on {formatDate(order.orderDate!)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Customer:</span>{" "}
            {order.customerName}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {order.email}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{order.status}</span>
          </div>
          <div>
            <span className="font-semibold">Invoice:</span>{" "}
            {order.invoice?.hosted_invoice_url ? (
              <a
                href={order.invoice.hosted_invoice_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                {order.invoice.number}
              </a>
            ) : (
              "—"
            )}
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold text-base">Products:</span>
          <div className="overflow-x-auto w-full mt-2 rounded-md border">
            <Table className="min-w-[300px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.products?.map((p, i) => {
                  const quantity = p.quantity || 0;
                  const price = p.product?.price || 0;
                  const total = price * quantity;
                  const imageUrl = p.product?.images?.[0]
                    ? urlFor(p.product.images[0]).url()
                    : null;

                  return (
                    <TableRow key={i}>
                      <TableCell>
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-md" />
                        )}
                      </TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>${price}</TableCell>
                      <TableCell>${total}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <span className="text-right font-semibold">Total Price:</span>
          <span className="font-bold text-shop_dark_green">
            {formatPrice(order?.totalPrice ?? 0, order.currency)}
          </span>
        </div>
        <div className="flex justify-end mt-6">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
