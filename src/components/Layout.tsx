import { Menu, X, UserPlus, ChevronRight, Home as HomeIcon, Video, Trophy, Users, Facebook, Instagram, Twitter, Youtube, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { translations } from "../data/translations";
import type { Language } from "../data/translations";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname } = useLocation();
  const { lang } = useParams();
  const navigate = useNavigate();

  // Establish stable language variable based on the URL param
  const safeLang = (lang === "km" ? "KH" : "EN") as Language;
  const t = translations[safeLang];
  const urlLang = safeLang === "KH" ? "km" : "en";

  // Deep-link language toggle that safely switches out the subdirectory
  const changeLanguage = (newLang: 'en' | 'km') => {
    // Only navigate if the target language is different from current
    const currentIsEn = safeLang === "EN";
    if ((newLang === 'en' && currentIsEn) || (newLang === 'km' && !currentIsEn)) return;
    
    const newPath = pathname.replace(/^\/[^\/]+/, `/${newLang}`);
    navigate(newPath);
  };

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
    setNavVisible(true);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle scroll for sticky effect and hide-on-scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Sticky effect threshold
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { 
      label: t.nav.fighters, 
      path: "/fighters",
      submenu: [
        { label: t.nav.kunKhmerFighters, path: "/fighters" },
        { label: t.nav.mmaFighters, path: "/fighters/mma" },
      ]
    },
    { label: t.nav.gyms, path: "/gyms" },
    { label: t.nav.partners, path: "/partners" },
    { label: t.nav.media, path: "/watch" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.faq, path: "/faq" },
  ];

  const bottomNavLinks = [
    { label: 'Home', path: `/${urlLang}`, icon: HomeIcon },
    { label: 'Media', path: `/${urlLang}/watch`, icon: Video },
    { label: 'Gyms', path: `/${urlLang}/gyms`, icon: MapPin },
    { label: 'Roster', path: `/${urlLang}/fighters`, icon: Users },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans selection:bg-brand-gold selection:text-brand-dark flex flex-col relative w-full overflow-x-hidden">
      {/* MINIMALIST NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        navVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled ? 'bg-transparent backdrop-blur-md h-16 sm:h-20' : 'bg-transparent h-20 sm:h-24'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-4 -ml-4 text-brand-light hover:text-brand-gold transition-colors active:scale-95"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <Link to={`/${urlLang}`} className="hover:opacity-80 transition-opacity shrink-0">
              <img src="/FNF-LOGO-White.png" alt="FNF" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white">
            {navLinks.map((link) => {
              if (link.submenu) {
                return (
                  <div 
                    key={link.label}
                    className="relative py-8"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`hover:text-brand-gold transition-colors flex items-center gap-1 cursor-pointer ${pathname.includes(link.path) ? 'text-brand-light' : ''}`}>
                      {link.label}
                      <svg className={`w-3 h-3 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute left-0 top-full -mt-2 w-56 bg-[#1a1a1a] border border-white/5 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl"
                        >
                          {link.submenu.map((item) => (
                            <Link
                              key={item.path}
                              to={`/${urlLang}${item.path}`}
                              className="block px-4 py-3 rounded-xl hover:bg-brand-gold hover:text-black text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const fullPath = `/${urlLang}${link.path}`;
              const isActive = pathname === fullPath;
              return (
                <Link 
                  key={link.path} 
                  to={fullPath} 
                  className={`hover:text-brand-gold transition-colors ${isActive ? 'text-brand-gold' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 ml-2">
              <button 
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] active:scale-95 transition-all duration-300 ${
                  safeLang === 'EN' ? 'text-brand-gold' : 'text-white/40 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <div className="w-[1px] h-3 bg-white/10" />
              <button 
                onClick={() => changeLanguage('km')}
                className={`px-2 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] active:scale-95 transition-all duration-300 ${
                  safeLang === 'KH' ? 'text-brand-gold' : 'text-white/40 hover:text-white'
                }`}
                title="ភាសាខ្មែរ"
              >
                KH
              </button>
            </div>
            <Link to={`/${urlLang}/register`} className="hidden xs:flex bg-brand-gold text-black px-6 py-2.5 font-bold rounded-xl text-[10px] uppercase tracking-[0.2em] items-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95">
              <UserPlus size={16} />
              <span className="hidden sm:inline">{t.nav.register}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* BOTTOM NAV (MOBILE ONLY) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-brand-dark/80 backdrop-blur-3xl border-t border-white/5 pb-safe">
        <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-between">
          {bottomNavLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex flex-col items-center justify-center py-2 transition-all duration-300 min-w-[64px] ${
                  isActive ? 'text-brand-gold scale-110' : 'text-white/60 hover:text-white'
                }`}
              >
                <link.icon size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest mt-1.5">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active-dot"
                    className="absolute -bottom-1 w-1 h-1 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(255,212,63,1)]"
                  />
                )}
              </Link>
            );
          })}
          <Link
            to={`/${urlLang}/register`}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
              pathname.includes('register') ? 'bg-white text-black scale-105' : 'bg-brand-gold text-black shadow-lg shadow-brand-gold/20'
            }`}
          >
            <UserPlus size={22} strokeWidth={3} />
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* DIMMED BACKDROP OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden pointer-events-auto"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* SLIDE-OUT MENU PANEL */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, type: "spring", damping: 30, stiffness: 120 }}
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
                        transition={{ delay: i * 0.05 + 0.2, type: "spring", stiffness: 100, damping: 20 }}
                        className="mb-4"
                      >
                        <span className="block text-brand-gold uppercase tracking-[0.2em] text-[10px] font-black mb-2 opacity-100 px-4">
                          {link.label}
                        </span>
                        <div className="flex flex-col gap-1 ml-2 pl-2 border-l border-white/5">
                          {link.submenu.map((sub, j) => {
                            const fullSubPath = `/${urlLang}${sub.path}`;
                            const isSubActive = pathname === fullSubPath;
                            return (
                              <Link 
                                key={sub.path}
                                to={fullSubPath} 
                                className={`w-full block py-3 px-4 rounded-xl transition-all duration-300 uppercase tracking-tight flex items-center gap-3 ${
                                  isSubActive ? 'text-brand-gold bg-white/5 translate-x-3' : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {isSubActive && (
                                  <motion.div 
                                    layoutId="mobile-sub-dot"
                                    className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(255,212,63,0.8)] shrink-0" 
                                  />
                                )}
                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  }

                  const fullPath = `/${urlLang}${link.path}`;
                  const isActive = pathname.startsWith(fullPath);
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.2, type: "spring", stiffness: 100, damping: 20 }}
                    >
                      <Link 
                        to={fullPath} 
                        className={`relative w-full block py-4 px-4 rounded-xl transition-all duration-300 uppercase tracking-tighter group ${
                          isActive ? 'text-white bg-white/5 translate-x-2' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`${isActive ? 'text-brand-gold font-bold' : ''}`}>{link.label}</span>
                          {isActive && (
                            <motion.div 
                              layoutId="mobile-active-indicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-gold rounded-r-full shadow-[0_0_20px_rgba(255,212,63,0.5)]" 
                            />
                          )}
                          <ChevronRight size={20} className={`opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${isActive ? 'text-brand-gold opacity-100' : ''}`} />
                        </div>
                      </Link>
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
                  transition={{ delay: (navLinks.length + 2) * 0.05 + 0.4, type: "spring", stiffness: 100, damping: 20 }}
                  className="mt-6 mx-2"
                >
                  <Link to={`/${urlLang}/register`} className="bg-brand-gold text-black w-full py-5 text-center font-bold rounded-2xl flex items-center justify-center gap-3 text-base sm:text-lg uppercase tracking-widest shadow-[0_20px_40px_rgba(212,175,55,0.25)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <UserPlus size={20} strokeWidth={2.5} />
                    {t.nav.register}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN VIEW */}
      <main className="flex-1 w-full pb-28 lg:pb-0">
        {/* Pass down the derived language representation down to children like Home */}
        <Outlet context={{ language: safeLang }} />
      </main>

      {/* COMPREHENSIVE SITEMAP FOOTER */}
      <footer className="border-t border-white/5 bg-brand-dark pt-20 pb-12 mt-auto relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 pr-4">
              <Link to={`/${urlLang}`} className="hover:opacity-80 transition-opacity inline-block mb-6">
                <img src="/FNF-LOGO-White.png" alt="FNF" className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-[#888] font-medium max-w-sm mb-6 leading-relaxed">
                Premium Friday Night Fights combat sports platform. High-octane Vantablack and Combat Gold aesthetic. Experience Southeast Asia's premier fighting league.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
                  { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
                  { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
                  { icon: <Youtube size={18} />, href: "#", label: "YouTube" }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[#888] hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-brand-light font-semibold mb-6 flex items-center">
                <span className="w-1 h-1 bg-brand-gold rounded-full mr-2"></span> {t.footer.organization}
              </h3>
              <ul className="space-y-4 text-[#888] text-sm font-medium">
                <li><Link to={`/${urlLang}/about`} className="hover:text-brand-light transition-colors">{t.footer.aboutUs}</Link></li>
                <li><Link to={`/${urlLang}/about/rules`} className="hover:text-brand-light transition-colors">{t.footer.ruleset}</Link></li>
                <li><Link to={`/${urlLang}/register`} className="hover:text-brand-light transition-colors">{t.footer.registration}</Link></li>
                <li><Link to={`/${urlLang}/partners`} className="hover:text-brand-light transition-colors">{t.footer.officialPartners}</Link></li>
                <li><Link to={`/${urlLang}/contact`} className="hover:text-brand-light transition-colors">{t.footer.contact}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-brand-light font-semibold mb-6 flex items-center">
                <span className="w-1 h-1 bg-brand-gold rounded-full mr-2"></span> {t.footer.competition}
              </h3>
              <ul className="space-y-4 text-[#888] text-sm font-medium">
                <li><Link to={`/${urlLang}/fighters`} className="hover:text-brand-light transition-colors">{t.nav.kunKhmerFighters}</Link></li>
                <li><Link to={`/${urlLang}/gyms`} className="hover:text-brand-light transition-colors">{t.footer.trainingGyms}</Link></li>
                <li><Link to={`/${urlLang}/fighters/mma`} className="hover:text-brand-light transition-colors">{t.nav.mmaFighters}</Link></li>
                <li><Link to={`/${urlLang}/watch`} className="hover:text-brand-light transition-colors">{t.footer.videoVault}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs font-medium text-[#555]">
            <p>&copy; {(new Date()).getFullYear()} FNF Cambodia. {t.footer.allRightsReserved}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to={`/${urlLang}/sitemap`} className="hover:text-[#888] transition-colors">{t.footer.sitemap}</Link>
              <Link to={`/${urlLang}/privacy-policy`} className="hover:text-[#888] transition-colors">{t.footer.privacy}</Link>
              <Link to={`/${urlLang}/terms-of-use`} className="hover:text-[#888] transition-colors">{t.footer.terms}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
