import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${path}` ?? `http://localhost:1337${path}`;
}

// export function getStrapiMedia(url) {
//   if (url == null) return null;
//   if (url.startsWith("data:")) return url;
//   if (url.startsWith("http") || url.startsWith("//")) return url;
//   return `${getStrapiURL()}${url}`;
// }