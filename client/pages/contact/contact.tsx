"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/layout/Footer"

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  first_name: Yup.string().required("Required").min(3, "Too short"),
  phone_no: Yup.string()
    .required("Required")
    .matches(phoneRegex, "Phone number is invalid")
    .min(10, "Too short")
    .max(10, "Too long"),
});

const contactUrl = "https://enquiry.mylapay.com/api/v1/admin/schedule/demo";
//https://enquiry.mylapay.com/api/v1/admin/schedule/demo


export default function ContactPageGlass() {
  const [initialValues] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone_no: "",
    message: "",
  });

  const onSave = async (values: any) => {
    try {
      await axios.post(contactUrl, values);
      toast.success("Thank you for contacting us!");
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  return (
    <>
          <div className="max-w-7xl mx-auto text-center mt-[7rem]">
        <h2 className="text-3xl sm:text-4xl font-extrabold secondarycolormylapay dark:text-white">
          Contact <span className="primarycolormylapay">Details</span>
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Stay Connected
        </p>
      </div>
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 gap-8"
      >
          {/* LEFT SIDE - Company Details */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/40 border border-white/30 rounded-2xl p-10 space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              We're here for you.
            </h2>
            <p className="text-gray-700">
              Reach us via email, phone, or visit our office. We’re always happy
              to help you!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin className="w-12 h-12 primarycolormylapay" />
                <p className="text-gray-800">
                  Pembroke, No.17/3, IIF, (8C) Second Floor,
                  Shaffe Mohammed Road, Thousand Lights, Chennai,
                  Tamil Nadu 600006.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 primarycolormylapay" />
                <p className="text-gray-800">contactus@mylapay.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 primarycolormylapay" />
                <p className="text-gray-800">+91 89254 61317</p>
              </div>
            </div>
          </motion.div>

        {/* RIGHT SIDE - Contact Form with Formik */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-10"
        >
          {/* <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2> */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              onSave(values);
              resetForm({ values: initialValues });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none ${
                        errors.first_name && touched.first_name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.first_name && touched.first_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none ${
                      errors.email && touched.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="phone_no"
                    placeholder="Phone"
                    value={values.phone_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none ${
                      errors.phone_no && touched.phone_no ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone_no && touched.phone_no && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone_no}</p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  <Send className="w-5 h-5" /> Send Message
                </motion.button>
              </form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </section>
    <Footer/>
    </>
  );
}