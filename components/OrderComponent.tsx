"use client";
import React, { useState } from "react";
import { MY_ORDER_QUERY } from "@/sanity/queries/query";
import { TableBody, TableRow, TableCell } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import OrderDetailDialog from "./OrderDetailDialog";

const OrderComponent = ({ orders }: { orders: MY_ORDER_QUERY | null }) => {
  const formatPrice = (amount: number, currency: string = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100); // تحويل من سنتات إلى دولار
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDER_QUERY[number] | null
  >(null);

  const statusColorMap = {
    pending: "text-yellow-600",
    processing: "text-blue-600",
    paid: "text-green-600  text-center  h-5 rounded-md",
    shipped: "text-indigo-600",
    out_for_delivery: "text-purple-600",
    delivered: "text-shop_dark_green",
    cancelled: "text-red-600",
  };
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((o) => (
            <TableRow
              key={o.orderNumber}
              className="hover:bg-gray-50 transition mt-5 font-bold"
              onClick={() => setSelectedOrder(o)}
            >
              <TableCell className="font-medium">
                <div className="my-5">{o.orderNumber}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(o.orderDate)}
              </TableCell>
              <TableCell>{o.customerName}</TableCell>
              <TableCell className="hidden md:table-cell">{o.email}</TableCell>
              <TableCell>
                {formatPrice(o.totalPrice)} {o.currency}
              </TableCell>
              <TableCell
                className={statusColorMap[o.status] || "text-gray-600"}
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
