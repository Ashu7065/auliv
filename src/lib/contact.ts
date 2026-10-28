export const WHATSAPP_NUMBER = "918368879809";
export const PHONE_DISPLAY = "+91 8368879809";
export const TEL_HREF = "tel:+918368879809";
export const INSTAGRAM_URL = "https://www.instagram.com/aulivoffical/";
export const INSTAGRAM_HANDLE = "@aulivoffical";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61595562017874";
export const HOURS = "Monday – Saturday";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
