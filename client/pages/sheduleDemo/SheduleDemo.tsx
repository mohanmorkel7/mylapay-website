import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tag,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/layout/Footer"

export default function DemoForm() {
  const [form, setForm] = useState({
    demoTitle: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.demoTitle.trim()) e.demoTitle = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) e.phone = "Invalid phone";
    if (!form.company.trim()) e.company = "Required";
    if (!form.date) e.date = "Pick a date";
    if (!form.time) e.time = "Pick a time";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);
    // fake submit delay
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSuccess(true);
  }

  const inputBase = "w-full pl-12 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur rounded-2xl shadow-lg mt-[7rem] mb-20"
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">Schedule a Demo</h2>
      <p className="text-sm text-slate-500 mb-6">Personalized Walkthrough with Our Experts</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Demo Title */}
        <div className="relative">
          <label className="sr-only">Demo Title</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Tag size={18} />
          </div>
          <input
            name="demoTitle"
            value={form.demoTitle}
            onChange={handleChange}
            placeholder="Demo title"
            className={inputBase + (errors.demoTitle ? " border-red-400" : " border-slate-200")}
          />
          {errors.demoTitle && <p className="text-xs text-red-500 mt-1">{errors.demoTitle}</p>}
        </div>

        {/* Name */}
        <div className="relative">
          <label className="sr-only">Name</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <User size={18} />
          </div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputBase + (errors.name ? " border-red-400" : " border-slate-200")}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <label className="sr-only">Email</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Mail size={18} />
          </div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputBase + (errors.email ? " border-red-400" : " border-slate-200")}
            type="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="relative">
          <label className="sr-only">Phone</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Phone size={18} />
          </div>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputBase + (errors.phone ? " border-red-400" : " border-slate-200")}
            type="tel"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Company */}
        <div className="relative md:col-span-2">
          <label className="sr-only">Company</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Building size={18} />
          </div>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
            className={inputBase + (errors.company ? " border-red-400" : " border-slate-200")}
          />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>

        {/* Date */}
        <div className="relative">
          <label className="sr-only">Date</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Calendar size={18} />
          </div>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputBase + (errors.date ? " border-red-400" : " border-slate-200")}
            type="date"
          />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
        </div>

        {/* Time */}
        <div className="relative">
          <label className="sr-only">Time</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Clock size={18} />
          </div>
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            className={inputBase + (errors.time ? " border-red-400" : " border-slate-200")}
            type="time"
          />
          {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex items-center justify-end">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md"
            aria-live="polite"
          >
            {submitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ display: "inline-block" }}
              >
                ⏳
              </motion.span>
            ) : (
              <>
                Submit <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </div>

        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 mt-2 text-center text-sm text-green-600"
          >
            Thanks — your demo request is received! We'll reach out to confirm.
          </motion.div>
        )}
      </form>

      <style>{`
        /* small helper to ensure the icon area doesn't overlap text on very small screens */
        @media (max-width: 420px) {
          input {
            padding-left: 3rem !important;
          }
        }
      `}</style>
    </motion.div>
    <Footer/>
    </>
  );
}
