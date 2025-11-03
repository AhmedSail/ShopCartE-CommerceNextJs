"use client";

import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: Array<{
    assets?: {
      _ref: string;
      _type: "reference";
      _week?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-96 border border-black/10 rounded-md overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            alt="Product Image"
            width={700}
            height={700}
            priority
            className={`w-full h-full object-contain transition-transform duration-300 hover:scale-105 ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((i) => (
          <button
            key={i?._key}
            onClick={() => setActive(i)}
            className={`border overflow-hidden rounded-md ${
              active?._key === i?._key
                ? "ring-2 ring-darkcolor"
                : "border-muted"
            }`}
          >
            <Image
              src={urlFor(i).url()}
              alt={`Thumbnail ${i?._key}`}
              width={700}
              height={500}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
