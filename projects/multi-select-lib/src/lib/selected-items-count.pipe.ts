import {Pipe, PipeTransform} from '@angular/core';
import {ItemFlatNode} from './components/multi-select-tree/multi-select-tree.component';

@Pipe({
  name: 'selectedItemsCount'
})
export class SelectedItemsCountPipe implements PipeTransform {
  transform(nodes:Array<ItemFlatNode>): number {
    return   nodes.filter((el)=> !el.expandable).length;
  }
}
