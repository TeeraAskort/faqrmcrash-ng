import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.sass'],
})
export class BlockedComponent implements OnInit {
  // prettier-ignore
  @Input() blockedPlayersUpdate: Observable<Player[] | undefined> = new Observable<Player[] | undefined>();
  @Output() unblockPlayer: EventEmitter<String> = new EventEmitter<String>();

  public blockedPlayers: Player[] | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    this.blockedPlayersUpdate.subscribe((data) => {
      if (data) {
        this.blockedPlayers = [...data];
      }
    });
  }

  public unblock(username: String) {
    this.unblockPlayer.emit(username);
  }
}
