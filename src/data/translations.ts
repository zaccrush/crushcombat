// src/data/translations.ts
// Minimal translation stubs for Layout.tsx and Sitemap.tsx compatibility

export type Language = "EN" | "KH";

export const translations: Record<Language, {
  nav: {
    fighters: string;
    kunKhmerFighters: string;
    mmaFighters: string;
    gyms: string;
    partners: string;
    media: string;
    about: string;
    faq: string;
    register: string;
  };
  footer: {
    organization: string;
    aboutUs: string;
    ruleset: string;
    registration: string;
    officialPartners: string;
    contact: string;
    competition: string;
    trainingGyms: string;
    videoVault: string;
    allRightsReserved: string;
    sitemap: string;
    privacy: string;
    terms: string;
  };
}> = {
  EN: {
    nav: {
      fighters: "Fighters",
      kunKhmerFighters: "Kun Khmer Fighters",
      mmaFighters: "MMA Fighters",
      gyms: "Gyms",
      partners: "Partners",
      media: "Watch",
      about: "About",
      faq: "FAQ",
      register: "Register",
    },
    footer: {
      organization: "Organization",
      aboutUs: "About Us",
      ruleset: "Rules & Regulations",
      registration: "Fighter Registration",
      officialPartners: "Official Partners",
      contact: "Contact Us",
      competition: "Competition",
      trainingGyms: "Training Gyms",
      videoVault: "Video Vault",
      allRightsReserved: "All rights reserved.",
      sitemap: "Sitemap",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },
  },
  KH: {
    nav: {
      fighters: "អ្នកប្រយុទ្ធ",
      kunKhmerFighters: "គុនខ្មែរ",
      mmaFighters: "MMA",
      gyms: "ដំបង់ហាត់",
      partners: "ដៃគូ",
      media: "មើល",
      about: "អំពី",
      faq: "សំណួរ",
      register: "ចុះឈ្មោះ",
    },
    footer: {
      organization: "អង្គការ",
      aboutUs: "អំពីយើង",
      ruleset: "វិធាន​ និង​បទប្បញ្ញត្តិ",
      registration: "ចុះឈ្មោះអ្នកប្រយុទ្ធ",
      officialPartners: "ដៃគូផ្លូវការ",
      contact: "ទំនាក់ទំនង",
      competition: "ការប្រកួត",
      trainingGyms: "ដំបង់ហាត់",
      videoVault: "វីដេអូ",
      allRightsReserved: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
      sitemap: "ផែនទីគេហទំព័រ",
      privacy: "គោលការណ៍ឯកជនភាព",
      terms: "លក្ខខណ្ឌប្រើប្រាស់",
    },
  },
};
