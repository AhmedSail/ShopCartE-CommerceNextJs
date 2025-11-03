import Container from "@/components/Container";
import OrderComponent from "@/components/OrderComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Orders = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);

  return (
    <div className="mt-24">
      <Container>
        <div className=" py-20">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-xl font-semibold mb-2">No orders found</h2>
              <p className="text-gray-600 mb-6">
                It looks like you haven’t made any purchases yet. Start shopping
                to fill your order list.
              </p>
              <Link
                href="/shop"
                className="bg-shop_light_green hover:bg-shop_btn_dark_green text-white px-6 py-2 rounded-md transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Order List</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea>
                    <Table>
                      <TableHeader className="mb-5 text-shop_light_text">
                        <TableRow>
                          <TableHead className="w-[100px] md:w-auto">
                            Order Number
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Email
                          </TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Invoice Number
                          </TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <OrderComponent orders={orders} />
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Orders;
