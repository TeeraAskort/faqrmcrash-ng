import { Player } from './player.interface';

export interface FriendRequest {
  id: number;
  playerSendingRequest: Player;
  playerGettingTheRequest: Player;
}
