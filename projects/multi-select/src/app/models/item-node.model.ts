/**
 * Node for to-do item
 */
export interface ItemNode {
  children?: ItemNode[];
  name: string;
  id?: string;
}
