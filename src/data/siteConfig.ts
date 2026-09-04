import content from "./content.json";

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  role: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  instagram?: string;
  twitter?: string;
}

export const siteConfig: SiteConfig = content.site;
export default siteConfig;
