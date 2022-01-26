import { Pageable } from './pageable.interface';
import { Player } from './player.interface';

export interface Page {
  content: Player[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
}
