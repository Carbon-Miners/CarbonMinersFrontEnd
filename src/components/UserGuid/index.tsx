"use client"

import { motion } from "framer-motion";
import { SlideUp } from "@/utils";

const UserGuid = () => {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-5xl px-5 py-3">
        {/* Title */}
        <motion.p
          variants={SlideUp(0.5)}
          initial="initial"
          animate="animate"
          className="text-center text-sm font-bold uppercase">3 easy steps</motion.p>
        <motion.h2
          variants={SlideUp(0.6)}
          initial="initial"
          animate="animate"
          className="text-center text-3xl font-bold md:text-5xl">How it works</motion.h2>
        <motion.p
          variants={SlideUp(0.7)}
          initial="initial"
          animate="animate"
          className="mx-auto mb-8 mt-4 max-w-lg text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">Participate in the carbon credit market with ease and transparency.</motion.p>
        {/* Content */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {/* Item */}
          <motion.div
            variants={SlideUp(0.2)}
            initial="initial"
            animate="animate"
            className="grid gap-4 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <p className="text-sm font-bold sm:text-xl text-gray-600">1</p>
            </div>
            <p className="text-xl font-semibold">Apply for Quotas</p>
            <p className="text-sm text-gray-500">Submit your annual carbon emission quota application to the management platform at the beginning of the year.</p>
          </motion.div>
          {/* Item */}
          <motion.div
            variants={SlideUp(0.4)}
            initial="initial"
            animate="animate"
            className="grid gap-4 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <p className="text-sm font-bold sm:text-xl text-gray-600">2</p>
            </div>
            <p className="text-xl font-semibold">Engage in Trading</p>
            <p className="text-sm text-gray-500">Participate in the auction market to buy or sell the required quotas, ensuring transparency and ease in cross-border transactions.</p>
          </motion.div>
          {/* Item */}
          <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            animate="animate"
            className="grid gap-4 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <p className="text-sm font-bold sm:text-xl text-gray-600">3</p>
            </div>
            <p className="text-xl font-semibold">Report and Settle</p>
            <p className="text-sm text-gray-500">Submit your annual emission report and ensure compliance by settling your quotas before the deadline, with the assurance of decentralized verification.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default UserGuid;