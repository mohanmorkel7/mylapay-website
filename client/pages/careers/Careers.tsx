"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import logo from "@/pages/assets/images/fav.png";
import Footer from "@/components/layout/Footer";

const departments = [
  "All Departments",
  "Business Development & Sales",
  "Business Enablement",
  "Engineering",
  "Corporate",
  "Customer Experience & Operations",
  "Product Management",
  "Tech Infra & IT",
  "Data Science",
  "Design & Creative",
];

const jobs = [
  {
    title: "AM, Accounting",
    department: "Corporate",
    type: "Full time",
    location: "Bengaluru - Salarpuria Softzone (SSZ)",
    daysAgo: "6 days ago",
  },
  {
    title: "Analyst, Accounting (Accounts Receivable)",
    department: "Corporate",
    type: "Full time",
    location: "Bengaluru - Salarpuria Softzone (SSZ)",
    daysAgo: "50 days ago",
  },
  {
    title: "Fin-Ops (Contractual 1 year)",
    department: "Business Development & Sales",
    type: "Contract",
    location: "Bengaluru - Salarpuria Softzone (SSZ)",
    daysAgo: "6 days ago",
  },
  {
    title: "BD Associate",
    department: "Business Development & Sales",
    type: "Full time",
    location: "Chennai",
    daysAgo: "3 days ago",
  },
];

export default function CareersPage() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("All Departments");

  // filter logic
  const filteredJobs =
    selectedDept === "All Departments"
      ? jobs
      : jobs.filter((job) => job.department === selectedDept);

  return (
    <>
      <div className="min-h-screen bg-[#f7f6fb] px-4 md:px-10 py-10 mt-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex">
            <img src={logo} alt="Logo" className="w-10 h-10 mb-4 mr-3" />
            <h1 className="text-2xl md:text-3xl font-semibold text-[#4a148c]">
              Be a Mylapay the Future of Digital India
            </h1>
          </div>

          <p className="mt-2 text-gray-600 text-sm md:text-base">
            We're looking for talented people like you!
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="mt-6 w-full max-w-xl border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-4 h-fit">
            <ul className="space-y-2">
              {departments.map((dept, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm md:text-base ${
                    selectedDept === dept
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {dept}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Filter Row */}
            <div className="flex flex-wrap items-start  gap-4 mb-6 relative">
              {/* Location Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLocationOpen(!locationOpen);
                    setTypeOpen(false);
                  }}
                  className="flex items-center gap-1 text-gray-600 text-sm md:text-base cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  By location
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      locationOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {locationOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-2 w-40 bg-white rounded-lg shadow border p-2 text-sm z-10"
                    >
                      {["Chennai", "Mumbai", "Madurai"].map((loc, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          {loc}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setTypeOpen(!typeOpen);
                    setLocationOpen(false);
                  }}
                  className="flex items-center gap-1 text-gray-600 text-sm md:text-base cursor-pointer"
                >
                  By type
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      typeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {typeOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-2 w-40 bg-white rounded-lg shadow border p-2 text-sm z-10"
                    >
                      {["Contract", "Full time", "Intern"].map((type, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          {type}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                    {job.location}
                  </div>
                  <h3 className="text-blue-700 font-semibold text-lg">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">{job.department}</p>
                  <p className="text-sm text-gray-600">{job.type}</p>
                  <p className="text-xs text-gray-400">{job.daysAgo}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
