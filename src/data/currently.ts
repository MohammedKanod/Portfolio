import content from "./content.json";

export interface CurrentlyItem {
  key: string;
  title: string;
  detail: string;
  tag: string;
}

export const currentlyDispatch: CurrentlyItem[] = content.currently.items;
