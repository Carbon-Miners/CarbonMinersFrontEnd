"use client"

import { motion } from "framer-motion";
import { SlideUp } from "@/utils";

const IntroComp = () => {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[560px] gap-10 container">
          <div className="flex flex-col justify-center gap-7 md:pr-8 xl:pr-32 text-center md:text-left pt-16 md:pt-0 pl-20 text-[--basic-text]">
            <motion.h1
              variants={SlideUp(0.2)}
              initial="initial"
              animate="animate"
              className="text-4xl font-bold intro"
            >
              Marketing
            </motion.h1>
            <motion.h1
              variants={SlideUp(0.3)}
              initial="initial"
              animate="animate"
              className="text-4xl font-bold intro"
            >
              carbon credit
            </motion.h1>
            <motion.h1
              variants={SlideUp(0.4)}
              initial="initial"
              animate="animate"
              className="text-4xl font-bold intro"
            >
              with us
            </motion.h1>
            <motion.p
              variants={SlideUp(0.5)}
              initial="initial"
              animate="animate"
              className="text-sm md:text-base text-[--secondry-text] leading-7"
            >
              Welcome to CarbonTrader - Your Blockchain Marketplace for Carbon Credits Trading. Experience transparent transactions, seamless cross-border deals, and the power of decentralized exchange
            </motion.p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              src="/hero.png"
              alt=""
              className="w-[80%] md:w-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default IntroComp;