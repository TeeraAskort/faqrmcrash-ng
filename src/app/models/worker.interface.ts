import { Task } from './task.interface';
export interface Worker {
  id: Number;
  name: String;
  age: Number;
  imageUrl: String;
  filename: String;
  hired: string;
  playerHired: boolean | false;
  costOfHiring: Number;
  taskAssignedTo: Task;
}
