import { PlayerListEntry } from './../../models/PlayerListEntry.interface';
import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass'],
})
export class LeaderboardComponent implements OnInit {
  public players: PlayerListEntry[] | undefined = undefined;
  public columnsToDisplay = ['index', 'image', 'name', 'money'];

  constructor(private restSevice: RestService) {
    this.restSevice.fetchLeaderboard().subscribe((data) => {
      if (data) {
        this.players = data;
      }
    });
  }

  ngOnInit(): void {}
}
