export const siteConfig = {
  name: "Du Pré au Casier",

  shortName: {
    first: "Du Pré",
    second: "au Casier",
  },

  description:
    "Produits locaux, frais et de qualité, disponibles directement au casier.",

  currency: "EUR",

  contact: {
    email: "contact@dupreaucasier.fr",
    phone: "06 00 00 00 00",
    location: "Rennes, France",
  },

  social: {
    facebook: "",
    instagram: "",
  },

  branding: {
    logo: "/logo.svg",
  },

  features: {
    search: true,
    account: false,
    cart: true,
    adminLink: true,
  },

  footer: {
    information: [
      "Livraison locale",
      "Retrait en casier",
      "Paiement sécurisé",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;