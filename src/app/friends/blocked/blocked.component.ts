import { Player } from 'src/app/models/player.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.sass'],
})
export class BlockedComponent implements OnInit {
  @Input() blockedPlayers: Player[] | undefined = undefined;
  @Output() unblockPlayer: EventEmitter<String> = new EventEmitter<String>();

  constructor() {}

  ngOnInit(): void {}

  public unblock(username: String) {
    this.unblockPlayer.emit(username);
  }
}
