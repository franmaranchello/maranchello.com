export interface FirestoreDate {
  seconds?: number;
  nanoseconds?: number;
  toDate?: () => Date;
}

export interface PortfolioProject {
  id: string;
  name: string;
  type: string;
  date: string;
  year: number | null;
  tags: string[];
  collection: string;
  description: string;
  content: string;
  gallery: string[];
}

export interface AboutContent {
  content: string;
}
