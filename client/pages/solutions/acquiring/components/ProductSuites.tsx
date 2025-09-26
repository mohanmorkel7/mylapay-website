
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Activity,
  BarChart3,
  Database,
  GitBranch,
  KeyRound,
  RotateCcw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  { title: "Mylapay TokenX", description: "Card Tokenization - COLF & Alt ID", span: "Encrypt | Process | Tokenize", icon: KeyRound },
  { title: "Mylapay Secure", description: "3DS Server certified by EMVCo", span: "Detect | Prevent | Authenticate", icon: ShieldCheck },
  { title: "Mylapay C-Switch", description: "Base I Auth Switch for Card Payments", span: "Integrate | Transact | Authorize", icon: Server },
  { title: "IntelleWatch", description: "Fraud Risk Management (FRM) System", span: "Monitor | Block | Safeguard", icon: ShieldAlert },
  { title: "IntelleSettle", description: "Base II Clearing & Settlement System", span: "Submit | Collect | Settle", icon: Database },
  { title: "IntelleSolve", description: "Chargeback Management System", span: "Defend | Resolve | Recover", icon: RotateCcw },
  { title: "Intelle360", description: "Analytics Suite for Acquiring Payments", span: "Intelligence | Protection | Growth", icon: BarChart3 },
  { title: "Mylapay U-Switch", description: "UPI Switch for PSPs, Beneficiary Banks", span: "Connect | Route | Approve", icon: GitBranch },
  { title: "IntellePro", description: "Real-time TMS for UPI Transactions", span: "Reconcile | Settle | Recover", icon: Activity },
  { title: "Mylapay Switch X", description: "Seamless integration with branching workflows.", span: "Branch | Merge | Track", icon: Zap },
];

// Only first 6 follow the highlight sequence
const acquiringIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// Sequence: 1 → 2 → 3 → 6 → 5 → 4
//sequence : 2->6->8->4->
const highlightOrder = [2, 6, 8, 4, 0, 1, 5, 9, 7, 3, 10];


export default function PrecisionSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Stores highlighted indexes
  const [highlightedSet, setHighlightedSet] = useState<number[]>([]);
  const [step, setStep] = useState(0);

  // Scroll line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.1", "end 0.1"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const remainder = features.length % 3;

  // Auto highlight in sequence
// Auto highlight in sequence
useEffect(() => {
  let cycleTimer: NodeJS.Timeout;

  const startCycle = () => {
    cycleTimer = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep >= highlightOrder.length) {
          clearInterval(cycleTimer);

          // Reset after short delay
          setTimeout(() => {
            setHighlightedSet([]);
            setStep(0);
            startCycle();
          }, 2000);

          return prevStep;
        }

        const nextIndex = highlightOrder[prevStep];
        setHighlightedSet((prev) => [...prev, nextIndex]);

        return prevStep + 1;
      });
    }, 1200); // smoother than 1000ms
  };

  startCycle();
  return () => clearInterval(cycleTimer);
}, []);


  return (
    <section className="relative py-12 px-6 md:px-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative">
        {/* Center vertical line */}
        <div className="relative">
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-[6px] pointer-events-none"
            viewBox="0 0 6 2000"
            preserveAspectRatio="none"
          >
            {/* Gray base line with gaps */}
            <line
              x1="3"
              y1="0"
              x2="3"
              y2="2000"
              stroke="#E5E7EB"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="80 140" // 80px line, 140px gap
            />
            {/* Blue animated line */}
            <motion.line
              x1="3"
              y1="0"
              x2="3"
              y2="2000"
              stroke="url(#blueGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="80 140"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2cade3" />
                <stop offset="100%" stopColor="#1f2b5c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Features Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon as any;
              const colIndex = idx % 3;
              const isLastSingleCentered = idx === features.length - 1 && remainder === 1;

              const alignmentClass = isLastSingleCentered
                ? "md:col-start-2 md:col-end-3 md:items-center"
                : colIndex === 0
                ? "md:items-end"
                : colIndex === 1
                ? "md:items-center"
                : "md:items-start";

              const isAcquiring = acquiringIndexes.includes(idx);
              const isAutoHighlighted = highlightedSet.includes(idx);
              const isHovered = !isAcquiring && hoveredIndex === idx;

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => !isAcquiring && setHoveredIndex(idx)}
                  onMouseLeave={() => !isAcquiring && setHoveredIndex(null)}
                  className={`relative flex flex-col items-center ${alignmentClass} transition-all duration-300`}
                >
                  {/* Icon Badge */}
                  <motion.div
                      animate={isAutoHighlighted ? { scale: 1.08, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative w-14 h-14 flex items-center justify-center rounded-full border-2 shadow-md z-10 transition-all duration-300
                      ${
                        isHovered || isAutoHighlighted
                          ? "bg-gradient-to-br from-[#2cade3] to-[#1f2b5c] border-blue-300"
                          : "bg-gray-100 border-gray-300"
                      }`}
                  >
                    <Icon
                      className="w-7 h-7"
                      strokeWidth={2.2}
                      color={isHovered || isAutoHighlighted ? "#ffffff" : "#1f2b5c"}
                    />
                  </motion.div>

                  {/* Product Card */}
                  <motion.div
                    animate={isAutoHighlighted ? { y: -3, scale: 1.02 } : { y: 0, scale: 1 }}
                    whileHover={!isAcquiring ? { y: -3, scale: 1.01 } : undefined}
                    transition={{ duration: 0.4 }}
                    className={`p-4 sm:p-5 rounded-2xl text-center backdrop-blur-sm shadow-sm border transition-colors duration-300 
                      w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] 
                      min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col justify-between
                      ${
                        isHovered || isAutoHighlighted
                          ? "bg-gradient-to-br from-[#f0f9ff] to-[#dbeafe] border-blue-300"
                          : "bg-white border-gray-200"
                      }`}
                  >
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <p className="mt-3 text-xs md:text-sm text-blue-700 font-medium">
                      {feature.span}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
