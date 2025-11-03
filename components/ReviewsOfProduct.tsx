"use client";
import { StarIcon } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ReviewsOfProduct = () => {
  const [active, setActive] = useState(1);

  const buttons = [
    { id: 1, name: "Description" },
    { id: 2, name: "Additional Information" },
    { id: 3, name: "Reviews" },
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="md:w-2/3">
      {/* Tab Buttons */}
      <div className="flex items-center justify-between bg-[#E9EDEC] py-1 px-2 text-center rounded-md">
        {buttons.map((b) => (
          <button
            key={b.id}
            className={`w-full ${
              b.id === active
                ? "bg-white text-shop_dark_green font-bold border-2 border-shop_dark_green"
                : ""
            } py-2 px-11 rounded-md outline-0 transition-all duration-200`}
            onClick={() => setActive(b.id)}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {active === 1 && (
          <motion.div
            key="description"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-shop_light_text flex flex-col gap-5 mt-5 mb-5"
          >
            <p>
              In ducimus quod sed eum repellendus ea fugiat. Pariatur et illo at
              iure harum. Molestiae a itaque voluptas explicabo praesentium.
              Possimus omnis aut architecto et. Repellendus ab ipsa in non
              doloremque tenetur est doloremque.
            </p>
            <p>
              Quam in facere soluta consequatur voluptatem beatae asperiores.
              Qui quia itaque illo eos quibusdam voluptatem et. Est aut deserunt
              iste. Et ipsum eius ut odit deleniti.
            </p>
            <p>
              Officia praesentium ipsam perferendis possimus ex culpa voluptatem
              dolore. Aut id sit et vitae. Quis unde doloremque quisquam facere.
              In qui eos est voluptatem repudiandae blanditiis consequatur.
            </p>
          </motion.div>
        )}

        {active === 2 && (
          <motion.div
            key="additional"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-shop_light_text flex flex-col gap-5 mt-5 mb-5"
          >
            <div className="w-1/2 flex items-center justify-between ml-5">
              <h1 className="font-semibold">Weight</h1>
              <span>190 kg</span>
            </div>
            <hr />
            <div className="w-1/2 flex items-center justify-between ml-5">
              <h1 className="font-semibold">Dimensions</h1>
              <span>3 × 72 × 109 cm</span>
            </div>
          </motion.div>
        )}

        {active === 3 && (
          <motion.div
            key="reviews"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-shop_light_text flex flex-col gap-5 mt-5 mb-5"
          >
            {/* Example Review */}

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < 5
                          ? "text-shop_light_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 5 ? "#93d991" : "#ababab"}
                      size={10}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-black">Duc Pham</span>
                <span className="text-sm text-shop_light_text">
                  - July 21, 2021
                </span>
              </div>
              <p>
                I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the
                chest and shoulders. My only complaint is that it is so long! I
                like to wear polo shirts untucked. This shirt goes completely
                past my rear end. If I wore it with ordinary shorts, you
                probably wouldnt be able to see the shorts at all – completely
                hidden by the shirt. It needs to be 4 to 5 inches shorter in
                terms of length to suit me. I have many RL polo shirts, and this
                one is by far the longest. I dont understand why.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < 5
                          ? "text-shop_light_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 5 ? "#93d991" : "#ababab"}
                      size={10}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-black">
                  Kenneth R. Myers
                </span>
                <span className="text-sm text-shop_light_text">
                  - July 21, 2021
                </span>
              </div>
              <p>
                The shirt was not the fabric I believed it to be. It says
                Classic Fit but was made like the older versions, not the soft
                cotton like my others. I don&apos;t understand how the labels
                are the same but a completely different shirt. Oh well, stuck
                with it now.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < 5
                          ? "text-shop_light_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 5 ? "#93d991" : "#ababab"}
                      size={10}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-black">
                  Mike Addington
                </span>
                <span className="text-sm text-shop_light_text">
                  - July 21, 2021
                </span>
              </div>
              <p>
                Real authentic genuine quality however it fit me like an XL size
                when In fact Im L. Beware
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < 4
                          ? "text-shop_light_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 4 ? "#93d991" : "#ababab"}
                      size={10}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-black">
                  Ervin Arlington
                </span>
                <span className="text-sm text-shop_light_text">
                  - July 21, 2021
                </span>
              </div>
              <p>
                The Ralph Lauren quaility is here in abundance. My husband
                always says that the Lauren polos fit better and last longer
                than any other brand.I love the new heathered color and the
                price is always excellent through shop.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        index < 3
                          ? "text-shop_light_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 3 ? "#93d991" : "#ababab"}
                      size={10}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-black">
                  Patrick M. Newman
                </span>
                <span className="text-sm text-shop_light_text">
                  - July 21, 2021
                </span>
              </div>
              <p>
                My son loved this Jacket for his Senior Prom… He got sooo many
                compliments! He is slim build 5&apos;11 and 150lbs … I ordered a
                large … it was a little big … but it was fine!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsOfProduct;
