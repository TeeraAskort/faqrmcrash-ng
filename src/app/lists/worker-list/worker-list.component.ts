import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.interface';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.sass'],
})
export class WorkerListComponent implements OnInit {
  public player: Player | undefined = undefined;

  constructor(private restService: RestService) {
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }

  ngOnInit(): void {}
}
