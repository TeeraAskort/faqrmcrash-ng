import { Crop } from './../../models/crop.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cropFilter',
})
export class CropFilterPipe implements PipeTransform {
  transform(items: Crop[], searchText: string): Crop[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
