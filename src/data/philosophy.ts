import content from "./content.json";

export interface Principle {
  number: string;
  statement: string;
  tagline: string;
  description: string;
}

export const manifesto = content.philosophy;
