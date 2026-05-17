import type { FirestoreDate, PortfolioPost, PortfolioProject } from "~/types/content";

export const toDate = (value: FirestoreDate | Date | string | null | undefined) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  if (typeof value.toDate === "function") return value.toDate();
  if (typeof value.seconds === "number") return new Date(value.seconds * 1000);
  return null;
};

export const toIsoDate = (value: FirestoreDate | Date | string | null | undefined) => {
  const date = toDate(value);
  return date ? date.toISOString() : "";
};

export const toYear = (value: FirestoreDate | Date | string | null | undefined) => {
  const date = toDate(value);
  return date ? date.getFullYear() : null;
};

export const normalizeTags = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((tag): tag is string => typeof tag === "string" && tag.length > 0);
};

export const normalizeGallery = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((url): url is string => typeof url === "string" && url.length > 0);
};

export const projectFromDoc = (id: string, data: Record<string, unknown>): PortfolioProject => ({
  id,
  name: String(data.name || "Untitled project"),
  type: String(data.type || ""),
  date: toIsoDate(data.date as FirestoreDate),
  year: toYear(data.date as FirestoreDate),
  tags: normalizeTags(data.tags),
  collection: String(data.collection || ""),
  description: String(data.description || ""),
  content: String(data.content || ""),
  gallery: normalizeGallery(data.gallery),
});

export const postFromDoc = (id: string, data: Record<string, unknown>): PortfolioPost => ({
  id,
  name: String(data.name || "Untitled post"),
  date: toIsoDate(data.date as FirestoreDate),
  year: toYear(data.date as FirestoreDate),
  tags: normalizeTags(data.tags),
  description: String(data.description || ""),
  content: String(data.content || ""),
  gallery: normalizeGallery(data.gallery),
});

export const formatDate = (value: string) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
};
