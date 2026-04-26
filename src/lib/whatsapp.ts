// Demo WhatsApp number — replace with the client's number when going live.
export const WHATSAPP_NUMBER = '966500000000';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
