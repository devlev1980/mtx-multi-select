import { Pipe, PipeTransform } from '@angular/core';
import {Option} from '../multi-select/models/option.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Option[] ,searchTerm: string,isAutocomplete?: boolean | undefined): Option[] {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      return item.text.toLowerCase().includes(searchTerm);
    });
  }

}
