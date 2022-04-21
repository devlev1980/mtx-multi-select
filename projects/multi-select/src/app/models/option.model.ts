export interface Option {
  id: number,
  text: string;
  selected: boolean;
  iconSrc?: string;
  iconAlt?: string;
  children?: Option[]
}
