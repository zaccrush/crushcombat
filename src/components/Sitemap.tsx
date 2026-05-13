import { Link, useOutletContext } from 'react-router-dom';
import { fighters } from '../data/fighters';
import { Home, Users, Video, Info, FileText, ChevronRight, Map } from 'lucide-react';
import type { Language } from '../data/translations';

export default function Sitemap() {
  const { language } = useOutletContext<{ language: Language }>();
  const urlLang = language === "KH" ? "km" : "en";

  const allFighters = Object.values(fighters);

  const sections = [
    {
      title: "Main Pages",
      icon: <Home size={20} />,
      links: [
        { name: "Home", path: `/${urlLang}` },
        { name: "Watch / Media", path: `/${urlLang}/watch` },
        { name: "Fighter Registration", path: `/${urlLang}/register` },
        { name: "Frequently Asked Questions", path: `/${urlLang}/faq` },
      ]
    },
    {
      title: "Fighters & Gyms",
      icon: <Users size={20} />,
      links: [
        { name: "All Fighters", path: `/${urlLang}/fighters` },
        { name: "MMA Fighters", path: `/${urlLang}/fighters/mma` },
        { name: "Affiliated Gyms", path: `/${urlLang}/gyms` },
      ]
    },
    {
      title: "About FNF",
      icon: <Info size={20} />,
      links: [
        { name: "About Us", path: `/${urlLang}/about` },
        { name: "Rules & Regulations", path: `/${urlLang}/about/rules` },
        { name: "Partners", path: `/${urlLang}/partners` },
        { name: "Sponsors", path: `/${urlLang}/about/sponsors` },
      ]
    },
    {
      title: "Support & Legal",
      icon: <FileText size={20} />,
      links: [
        { name: "Contact Us", path: `/${urlLang}/contact` },
        { name: "Privacy Policy", path: `/${urlLang}/privacy-policy` },
        { name: "Terms of Use", path: `/${urlLang}/terms-of-use` },
      ]
    }
  ];

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-brand-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <header className="mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-gold font-medium text-sm tracking-widest uppercase mb-6">
            <Map size={16} />
            <span>Site Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium uppercase tracking-tighter text-white mb-6">
            HTML <span className="text-brand-gold">Sitemap</span>
          </h1>
          <p className="text-xl text-[#888] font-medium leading-relaxed max-w-2xl">
            Complete architectural index of the Friday Night Fights platform for fighters, fans, and search bots.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5">
              <h2 className="flex items-center gap-3 text-xl font-display uppercase tracking-widest text-white mb-6">
                <span className="text-brand-gold">{section.icon}</span>
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.path}
                      className="group flex items-center justify-between text-[#888] hover:text-brand-gold transition-colors"
                    >
                      <span className="font-medium">{link.name}</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Fighter Roster Dynamic Index */}
        <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5">
          <h2 className="flex items-center gap-3 text-xl font-display uppercase tracking-widest text-white mb-6">
            <span className="text-brand-gold"><Users size={20} /></span>
            Fighter Profiles Index
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {allFighters.map((fighter) => (
              <Link 
                key={fighter.id}
                to={`/${urlLang}/fighters/${fighter.id}`}
                className="group flex items-center justify-between text-[#888] hover:text-brand-gold transition-colors"
              >
                <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {language === 'EN' ? fighter.name : (fighter.nameKhmer || fighter.name)}
                </span>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
