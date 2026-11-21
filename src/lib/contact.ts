import data from "../data/contato.json";

export const contact = data;
export const whatsappHref =
  `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Gostaria de saber mais sobre a consultoria de viagens da Manacá.",
  )}`;
export const emailHref = `mailto:${data.email}`;
