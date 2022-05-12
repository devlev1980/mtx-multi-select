import {Pipe, PipeTransform} from '@angular/core';
import {ItemFlatNode} from './models/item-flat-node';

@Pipe({
  name: 'selectedItemsCount'
})
export class SelectedItemsCountPipe implements PipeTransform {
  transform(nodes: Array<ItemFlatNode>): number {
    return nodes.filter((el) => !el.expandable).length;
  }
}
