// src/components/NavDropdown.tsx
// Extracted desktop dropdown island — uses Framer Motion AnimatePresence
// Self-contained: no react-router-dom dependency, uses native <a> tags

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DropdownItem {
  label: string;
  path: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  currentPath: string;
}

export default function NavDropdown({
  label,
  items,
  currentPath,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative py-8"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`hover:text-brand-gold transition-colors flex items-center gap-1 cursor-pointer text-[11px] font-black uppercase tracking-[0.2em] ${
          items.some((item) => currentPath.includes(item.path))
            ? "text-brand-light"
            : "text-white"
        }`}
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 top-full -mt-2 w-56 bg-[#1a1a1a] border border-white/5 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl"
          >
            {items.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="block px-4 py-3 rounded-xl hover:bg-brand-gold hover:text-black text-[10px] font-black uppercase tracking-widest transition-all text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
