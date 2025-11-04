"use client";
import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "./ui/table";
import { TooltipProvider } from "./ui/tooltip";
import OrderDetailDialog from "./OrderDetailDialog";
import { Order } from "@/sanity.types";

const OrderComponent = ({ orders }: { orders: Order[] | null }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatPrice = (amount: number, currency: string = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100);

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  const statusColorMap = {
    pending: "text-yellow-600",
    processing: "text-blue-600",
    paid: "text-green-600 text-center h-5 rounded-md",
    shipped: "text-indigo-600",
    out_for_delivery: "text-purple-600",
    delivered: "text-shop_dark_green",
    cancelled: "text-red-600",
  };

  if (!orders || orders.length === 0) return null;

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((o) => (
            <TableRow
              key={o._id}
              className="hover:bg-gray-50 transition mt-5 font-bold"
              onClick={() => setSelectedOrder(o)}
            >
              <TableCell className="font-medium">
                <div className="my-5">{o.orderNumber}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(o.orderDate!)}
              </TableCell>
              <TableCell>{o.customerName}</TableCell>
              <TableCell className="hidden md:table-cell">{o.email}</TableCell>
              <TableCell>
                {formatPrice(o.totalPrice!)} {o.currency}
              </TableCell>
              <TableCell
                className={statusColorMap[o.status!] || "text-gray-600"}
              >
                {o.status}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {o.invoice?.number || "—"}
              </TableCell>
              <TableCell className="text-center text-red-500">x</TableCell>
            </TableRow>
          ))}
        </TooltipProvider>
      </TableBody>

      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrderComponent;
