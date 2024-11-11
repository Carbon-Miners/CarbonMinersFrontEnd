"use client"

import { motion } from "framer-motion";
import DialogBtn from "./DialogBtn";

const HomeHeader = () => {

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[--card-bg] w-full flex justify-center items-center border border-[--split-line] fixed z-10 top-0"
    >
      <div className="container flex justify-between items-center py-4">
        <div className="font-bold text-lg cursor-pointer">
          CarbonTrader
        </div>
        <DialogBtn />
      </div>
    </motion.header>
  );
};
export default HomeHeader;