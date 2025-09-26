import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const navItems = [
  // { label: "Our Capabilities", href: "/#capabilities" },
  { label: "Our Products", href: "/#products", hasMegaMenu: true },
  { label: "Our Solutions", href: "/#solutions", hasSolutionsMenu: true },
  { label: "Developer", href: "https://apitest.mylapay.com/", external: true },
  { label: "Resources", href: "/#resources", hasResourcesMenu: true },
];

// Products menu
const products = [
  { label: "Mylapay Secure", desc: "3D-Server Authentication Version 2.3.1", href: "/products/mylapay-secure" },
  { label: "Mylapay C-Switch", desc: "Payment Authorization Switch", href: "/products/mylapay-cswitch" },
  { label: "Mylapay U-Switch", desc: "TMS For Post Authorization Process", href: "/products/mylapay-uswitch" },
  { label: "Mylapay TokenX", desc: "FRM - Risk Management Solution", href: "/products/mylapay-tokenx" },
  { label: "Mylapay SwitchX", desc: "Clearing & Settlements Solution", href: "/products/mylapay-switchx" },
  { label: "Intelle360", desc: "Reconciliation & GL Accounting Solution", href: "/products/mylapay-intelle360" },
  { label: "IntellePro", desc: "Transaction Profitability Analytics", href: "/products/mylapay-intellepro" },
  { label: "IntelleSolve", desc: "Chargeback Dispute Management Solution", href: "/products/mylapay-intellesolve" },
  { label: "IntelleSettle", desc: "API Based Add-ons solution", href: "/products/mylapay-intellesettle" },
  { label: "IntelleWatch", desc: "API Based Add-ons solution", href: "/products/mylapay-intellewatch" },
];

// Solutions menu
const solutions = [
  {
    key: "acquiring",
    title: "Acquiring support",
    description: "Local and cross-border acquiring with settlement and reconciliation for acquirers.",
    href: "/solutions/acquiring",
  },
  {
    key: "card",
    title: "Card Payments",
    description: "End-to-end card acceptance: tokenization, authorization, settlement and reporting.",
    href: "/solutions/card-payments",
  },
  {
    key: "upi",
    title: "UPI payments",
    description: "Fast, low-cost UPI acceptance with instant settlement and reconciliation.",
    href: "/solutions/upi-payments",
  },
  {
    key: "orchestration",
    title: "Payment Orchestration",
    description: "Smart routing, failover and optimization across multiple providers to maximize success rates.",
    href: "/solutions/payment-orchestration",
  },
];

// Resources menu
const resources = [
  { key: "about", title: "About Us", href: "/about" },
  { key: "careers", title: "Careers", href: "/careers" },
  { key: "contact", title: "Contact Us", href: "/contact" },
  { key: "CaseStudy", title: "Case Study", href: "/casestudy" },
  { key: "blog", title: "Blog", href: "/blog" },
  { key: "faq", title: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const handleEnter = (menu: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (menu === "ourProducts") {
      setMegaMenuOpen(true);
      setProductsMenuOpen(false);
      setResourcesMenuOpen(false);
    }
    if (menu === "products") {
      setProductsMenuOpen(true);
      setMegaMenuOpen(false);
      setResourcesMenuOpen(false);
    }
    if (menu === "resources") {
      setResourcesMenuOpen(true);
      setMegaMenuOpen(false);
      setProductsMenuOpen(false);
    }
  };

  const handleLeave = (menu: string) => {
    timerRef.current = setTimeout(() => {
      if (menu === "ourProducts") setMegaMenuOpen(false);
      if (menu === "products") setProductsMenuOpen(false);
      if (menu === "resources") setResourcesMenuOpen(false);
    }, 200);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/20 bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F9b23d41bd00a451298a1599df2fb1a80%2F6bb77510276f42a2badf7d1520f1310b?format=webp&width=800"
            alt="Company logo"
            className="h-8 w-auto rounded-sm"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) =>
            item.hasMegaMenu ? (
              // Products
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("ourProducts")}
                onMouseLeave={() => handleLeave("ourProducts")}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    megaMenuOpen || location.pathname.startsWith("/products")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {megaMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[780px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-3 gap-6 z-50 border border-slate-100">
                    {products.map((p) => (
                      <Link
                        key={p.label}
                        to={p.href}
                        onClick={() => {
                          setOpen(false);
                          setMegaMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">{p.label}</span>
                        <p className="text-xs text-slate-600">{p.desc}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasSolutionsMenu ? (
              // Solutions
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("products")}
                onMouseLeave={() => handleLeave("products")}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    productsMenuOpen || location.pathname.startsWith("/solutions")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {productsMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[620px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-2 gap-6 z-50 border border-slate-100 ml-[-50px]">
                    {solutions.map((p) => (
                      <Link
                        key={p.key}
                        to={p.href}
                        onClick={() => {
                          setOpen(false);
                          setProductsMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">{p.title}</span>
                        <p className="text-xs text-slate-600">{p.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasResourcesMenu ? (
              // ✅ Resources dropdown (3 top + 3 bottom)
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleEnter("resources")}
                onMouseLeave={() => handleLeave("resources")}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                    resourcesMenuOpen || location.pathname.startsWith("/resources")
                      ? "text-slate-900 after:w-full"
                      : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-[1px]" />
                </button>
                {resourcesMenuOpen && (
                  <div className="absolute right-0 mt-4 w-[450px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-3 gap-4 z-50 border border-slate-100">
                    {resources.map((r) => (
                      <Link
                        key={r.key}
                        to={r.href}
                        onClick={() => {
                          setOpen(false);
                          setResourcesMenuOpen(false);
                        }}
                        className={cn(
                          "block text-sm p-2 rounded-md hover:bg-slate-50",
                          location.pathname === r.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900"
                        )}
                      >
                        <span className="font-semibold secondarycolormylapay">
                          {r.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.external ? (
              // External
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-800/90 hover:text-slate-900"
              >
                {item.label}
              </a>
            ) : (
              // Normal link
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 after:ease-out after:w-0",
                  location.pathname === item.href
                    ? "text-slate-900 after:w-full"
                    : "text-slate-800/90 hover:text-slate-900 hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-800/90 hover:text-slate-900 hover:bg-white/10 transition"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t bg-white/80 transition-all",
          open ? "block" : "hidden"
        )}
      >
        <div className="container py-3 flex flex-col max-h-[80vh] overflow-y-auto">
          {navItems.map((item) =>
            item.hasMegaMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setMegaMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", megaMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {megaMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {products.map((p) => (
                      <Link
                        key={p.label}
                        to={p.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{p.label}</span>
                        <p className="text-xs text-slate-600">{p.desc}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasSolutionsMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setProductsMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", productsMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {productsMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {solutions.map((p) => (
                      <Link
                        key={p.key}
                        to={p.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === p.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{p.title}</span>
                        <p className="text-xs text-slate-600">{p.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.hasResourcesMenu ? (
              <div key={item.href} className="flex flex-col">
                <button
                  onClick={() => setResourcesMenuOpen((v) => !v)}
                  className="py-2 flex items-center justify-between text-base font-medium"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn("transition-transform", resourcesMenuOpen ? "rotate-180" : "rotate-0")}
                  />
                </button>
                {resourcesMenuOpen && (
                  <div className="pl-4 grid grid-cols-1 gap-3 mt-2">
                    {resources.map((r) => (
                      <Link
                        key={r.key}
                        to={r.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block text-sm p-2 rounded-md",
                          location.pathname === r.href
                            ? "text-slate-900 font-bold bg-slate-100"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{r.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-base text-slate-800/90 hover:text-slate-900"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2 text-base",
                  location.pathname === item.href
                    ? "text-slate-900 font-bold"
                    : "text-slate-800/90 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
