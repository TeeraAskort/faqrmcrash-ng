import { PlayerListEntry } from './PlayerListEntry.interface';
export interface PlayerList {
  page: number;
  players: PlayerListEntry[];
}
