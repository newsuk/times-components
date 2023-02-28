export type BreadcrumbsItem = {
  title: string;
  url: string;
};

export type BreadcrumbOptions = {
  isSelected: string;
  handleSelect: (value: string) => void;
};
