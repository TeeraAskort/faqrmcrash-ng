import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.interface';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass'],
})
export class LeaderboardComponent implements OnInit {
  public players: Player[] | undefined = undefined;
  public columnsToDisplay = ['name', 'money'];

  constructor(private restSevice: RestService) {
    this.restSevice.fetchLeaderboard().subscribe((data) => {
      if (data) {
        this.players = data;
      }
    });
  }

  ngOnInit(): void {}
}
