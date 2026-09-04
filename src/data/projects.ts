import content from "./content.json";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  oneLiner: string;
  description: string;
  tags: string[];
  metrics?: ProjectMetric[];
  highlights?: string[];
  takeaway?: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = (content.projects || []) as Project[];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
