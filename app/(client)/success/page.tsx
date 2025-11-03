"use client";

import useStore from "@/store";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const { user } = useUser();
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    if (session_id) {
      resetCart();
    }
  }, [session_id, resetCart]);

  return (
    <main className="mt-20 flex items-center justify-center bg-gray-100 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 text-center"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-bold text-green-600 mb-4"
        >
          Order Confirmed!
        </motion.h1>

        <p className="text-gray-700 mb-2">
          Thank you for your purchase. We're processing your order and will ship
          it soon. A confirmation email with your order details will be sent to
          your inbox shortly.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gray-100 rounded-md p-4 mb-6"
        >
          <p className="text-sm text-gray-500">Order Number:</p>
          <p className="font-bold text-black text-xl">{orderNumber}</p>
        </motion.div>

        <div className="text-left mb-6">
          <h2 className="text-md font-semibold text-gray-800 mb-2">
            What's Next?
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Check your email for your order confirmation</li>
            <li>You’ll receive shipping updates and delivery times</li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link
            href="/"
            className="bg-green-600 font-bold text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Home
          </Link>
          <a
            href="/orders"
            className="bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Orders
          </a>
          <a
            href="/shop"
            className="bg-gray-600 font-bold text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Shop
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default SuccessPage;
