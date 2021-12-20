import { Crop } from './crop.interface';
import { Worker } from './worker.interface';
import { Item } from './item.interface';

export interface Player {
  id: Number;
  name: String;
  crops: Crop[];
}
