import { Pipe, PipeTransform } from '@angular/core';
import { Worker } from 'src/app/models/worker.interface';

@Pipe({
  name: 'workerFilter',
})
export class WorkerFilterPipe implements PipeTransform {
  transform(items: Worker[], searchText: string): Worker[] {
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
