export type ID = string;

export interface SelectOption<T extends string = string> {
  label: string;
  value: T;
}
