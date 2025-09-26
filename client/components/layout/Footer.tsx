"use client";

import Favicon from "@/pages/assets/images/fav.png";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  // Utility to check active link
  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-slate-400 hover:text-white transition-colors";

  return (
    <footer className="bg-[#202c5c] text-white">
      <div className="container mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo + Copy */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <img src={Favicon} alt="Mylapay" className="h-6 w-auto bg-white" />
              <span className="font-semibold text-lg">Mylapay</span>
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Copyright © {new Date().getFullYear()} Mylapay.com
            </p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              For grievance resolution, contact our Grievance Officer at{" "}
              <a
                href="mailto:grievance@mylapay.com"
                className="hover:text-white transition-colors"
              >
                grievance@mylapay.com
              </a>
              .
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/casestudy" className={isActive("/casestudy")}>
                    Case Study
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={isActive("/blog")}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className={isActive("/faq")}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={isActive("/about")}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className={isActive("/careers")}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={isActive("/contact")}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Developers
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://developers.mylapay.com/api-reference" className="text-slate-400 hover:text-white" target="_blank" rel="noopener noreferrer" >
                  
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white">
                    SDKs
                  </a>
                </li>
              </ul>
            </div>
            
                        <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Products
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products/mylapay-secure"
                    className={isActive("/products/mylapay-secure")}
                  >
                    Mylapay Secure
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-cswitch"
                    className={isActive("/products/mylapay-cswitch")}
                  >
                    Mylapay C Switch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-uswitch"
                    className={isActive("/products/mylapay-uswitch")}
                  >
                    Mylapay U Switch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-tokenx"
                    className={isActive("/products/mylapay-tokenx")}
                  >
                    Mylapay-tokenX
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-switchx"
                    className={isActive("/products/mylapay-switchx")}
                  >
                    Mylapay-SwitchX
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intelle360"
                    className={isActive("/products/mylapay-intelle360")}
                  >
                    Intelle360
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellepro"
                    className={isActive("/products/mylapay-intellepro")}
                  >
                    IntellePro
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellesolve"
                    className={isActive("/products/mylapay-intellesolve")}
                  >
                    IntelleSolve
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellesettle"
                    className={isActive("/products/mylapay-intellesettle")}
                  >
                    IntelleSettle
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/mylapay-intellewatch"
                    className={isActive("/products/mylapay-intellewatch")}
                  >
                    Intelle Watch
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Solutions
              </h4>
              <ul className="space-y-2">
                 <li>
                  <Link to="/solutions/acquiring" className={isActive("//solutions/acquiring")}>
                    Acquiring Support
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/card-payments" className={isActive("/solutions/card-payments")}>
                    Card Payments
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/upi-payments" className={isActive("/solutions/upi-payments")}>
                    Upi-Payments
                  </Link>
                </li>
                <li>
                  <Link to = "/solutions/payment-orchestration" className={isActive("/solutions/payment-orchestration")}>
                  Payment-Orchestraion</Link>
                </li>
              </ul>
            </div>


          </div>

          {/* Location + Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-3 text-slate-200">
              Our Location
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              No 17/3, (Old No 8C), 2nd Floor, Pembroke,
              <br />
              Shafee Mohammad Road, Nungambakkam,
              <br />
              Chennai, Tamil Nadu, India, 600006.
            </p>

            <div className="mt-4 text-sm text-slate-400">
              {/* <Link
                to="mailto:contactus@mylapay.com"
                className="hover:text-white transition-colors block"
              >
                
              </Link> */}
              <div className="mt-2">contactus@mylapay.com</div>
              <div className="mt-2">+91 7200768159</div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/mylapay?mibextid=9R9pXO"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/mylapay/mycompany/"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#0A66C2] transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
              <a
                href="https://www.youtube.com/@mylapay6480"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-700/40 hover:bg-[#FF0000] transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5 text-slate-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-6">
          <div className="flex gap-6 mb-2 md:mb-0">
            <Link to="/terms" className={isActive("/terms")}>
              Acceptance Policy
            </Link>
            <Link to="/privacy" className={isActive("/privacy")}>
              Privacy
            </Link>
          </div>
          <div className="text-slate-500">
            © {new Date().getFullYear()} Mylapay. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
