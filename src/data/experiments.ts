import content from "./content.json";

export interface Experiment {
  id: string;
  code: string;
  title: string;
  oneLiner: string;
  category: string;
  status: string;
  date: string;
  hypothesis: string;
  findings: string;
  technologies: string[];
  specs: Record<string, string>;
  github?: string;
  demo?: string;
}

export const experiments: Experiment[] = (content.experiments || []) as Experiment[];
