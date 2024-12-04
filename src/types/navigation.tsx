export type TNavigationItem = {
  id: string;
  name: string;
  url?: string;
  children?: TNavigationItem[];
};

export type TNavigationForm = {
  name: string;
  url: string;
};

export type TNavigationFormType = "add" | "edit" | null;
