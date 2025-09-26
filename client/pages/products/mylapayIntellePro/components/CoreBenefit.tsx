"use client";

import { motion } from "framer-motion";
import {
  ShieldUser,
  CloudAlert,
  UserStar,
  Rocket,
} from "lucide-react";

const features = [
  {
    title: "Real-Time Reconciliation ",
    desc: "100% match rate accces Pay/collect cycles, merchant transactions, and NPCI files",
    icon: <ShieldUser className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Auto Settlement & GL posing   ",
    desc: "Generate reconcilation, GL, and fund settlement reports instantly and accurately ",
    icon: <CloudAlert className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Dispute & Refund Automation ",
    desc: "Auto handled chargebacks and credit adjustments with 500+ NPCI-aligned rule sets",
    icon: <UserStar className="w-6 h-6 text-[#fff]" />,
  },
  {
    title: "Zero revenue leakages ",
    desc: "Built -in validations ensure clean settlement and no mismatches or delays. ",
    icon: <Rocket className="w-6 h-6 text-[#fff]" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white pb-16 py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 primarycolormylapay bg-clip-text bg-gradient-to-r from-blue-500 to-[#2baee347]">
          Focus on scaling your UPI volumes
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          IntellePro matches your speed and scalw with precision.
        </h3>
      </div>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              y: -1,
              boxShadow: "0px 0px 25px rgba(31,43,92,0.4)",
              borderColor: "#2cade3",
              transition: {
                type: "tween",
                duration: 0.1,
                ease: "easeOut",
              },
            }}
            whileTap={{ scale: 0.97 }}
            className="relative bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#1f2b5c] cursor-default"
          >
            <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center bg-[#1f2b5c] rounded-full text-white shadow-md">
              {feature.icon}
            </div>
            <div className="mt-6">
              <h3 className="text-xl md:text-2xl secondarycolormylapay font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
