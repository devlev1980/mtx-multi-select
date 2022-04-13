export interface Option {
  primaryKey: number,
  text: string;
  selected: boolean;
  iconSrc?: string;
  iconAlt?: string;
  children?: Option[]
}
