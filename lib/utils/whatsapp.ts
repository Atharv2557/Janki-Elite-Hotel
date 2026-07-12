export const HOTEL_WHATSAPP_NUMBER = "919296909499";

type CreateWhatsAppUrlParams = {
  roomTitle?: string;
  price?: string;
  intent?: "book" | "inquiry" | "details";
};

export function createWhatsAppUrl({
  roomTitle = "Room",
  price,
  intent = "inquiry",
}: CreateWhatsAppUrlParams) {
  const messages = {
    book: `Hello, I want to book ${roomTitle}. ${
      price ? `Price: ${price}. ` : ""
    }Please share availability and booking details.`,

    inquiry: `Hello, I want to inquire about ${roomTitle}. ${
      price ? `Price: ${price}. ` : ""
    }Please share more details.`,

    details: `Hello, I want to know more about ${roomTitle}. ${
      price ? `Price: ${price}. ` : ""
    }`,
  };

  const message = encodeURIComponent(messages[intent]);

  return `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${message}`;
}