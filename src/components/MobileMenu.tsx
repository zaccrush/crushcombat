// src/components/MobileMenu.tsx
// Extracted interactive mobile menu island — uses Framer Motion animations
// Self-contained: no react-router-dom dependency, uses native <a> tags

import { useState } from "react";
import { Menu, X, UserPlus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;
  path: string;
  submenu?: { label: string; path: string }[];
}

interface MobileMenuProps {
  navLinks: NavLink[];
  currentPath: string;
  registerPath: string;
  registerLabel: string;
  logoSrc: string;
}

export default function MobileMenu({
  navLinks,
  currentPath,
  registerPath,
  registerLabel,
  logoSrc,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-4 -ml-4 text-brand-light hover:text-brand-gold transition-colors active:scale-95"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Menu overlay + panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dimmed backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden pointer-events-auto"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.6,
                type: "spring",
                damping: 30,
                stiffness: 120,
              }}
              className="fixed top-0 right-0 z-40 w-full xs:w-[85%] max-w-sm h-screen bg-brand-dark/95 backdrop-blur-3xl pt-28 px-6 flex flex-col overflow-y-auto pb-40 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] lg:hidden pointer-events-auto"
            >
              <div className="flex flex-col gap-2 text-2xl sm:text-3xl font-display font-medium mb-8">
                {navLinks.map((link, i) => {
                  if (link.submenu) {
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.05 + 0.2,
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        }}
                        className="mb-4"
                      >
                        <span className="block text-brand-gold uppercase tracking-[0.2em] text-[10px] font-black mb-2 opacity-100 px-4">
                          {link.label}
                        </span>
                        <div className="flex flex-col gap-1 ml-2 pl-2 border-l border-white/5">
                          {link.submenu.map((sub) => {
                            const isSubActive = currentPath === sub.path;
                            return (
                              <a
                                key={sub.path}
                                href={sub.path}
                                className={`w-full block py-3 px-4 rounded-xl transition-all duration-300 uppercase tracking-tight flex items-center gap-3 ${
                                  isSubActive
                                    ? "text-brand-gold bg-white/5 translate-x-3"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {isSubActive && (
                                  <motion.div
                                    layoutId="mobile-sub-dot"
                                    className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(255,212,63,0.8)] shrink-0"
                                  />
                                )}
                                {sub.label}
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  }

                  const isActive = currentPath.startsWith(link.path);
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05 + 0.2,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                    >
                      <a
                        href={link.path}
                        className={`relative w-full block py-4 px-4 rounded-xl transition-all duration-300 uppercase tracking-tighter group ${
                          isActive
                            ? "text-white bg-white/5 translate-x-2"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`${
                              isActive ? "text-brand-gold font-bold" : ""
                            }`}
                          >
                            {link.label}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active-indicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-gold rounded-r-full shadow-[0_0_20px_rgba(255,212,63,0.5)]"
                            />
                          )}
                          <ChevronRight
                            size={20}
                            className={`opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                              isActive ? "text-brand-gold opacity-100" : ""
                            }`}
                          />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.3 }}
                  className="h-[1px] bg-white/5 my-4 mx-4"
                />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (navLinks.length + 2) * 0.05 + 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="mt-6 mx-2"
                >
                  <a
                    href={registerPath}
                    className="bg-brand-gold text-black w-full py-5 text-center font-bold rounded-2xl flex items-center justify-center gap-3 text-base sm:text-lg uppercase tracking-widest shadow-[0_20px_40px_rgba(212,175,55,0.25)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <UserPlus size={20} strokeWidth={2.5} />
                    {registerLabel}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
