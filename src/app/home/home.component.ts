import { Player } from '../models/player.interface';
import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public player: Player | undefined = undefined;

  constructor(private restService: RestService) {
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }

  ngOnInit(): void {}

  public farmCrop(index: Number) {
    this.restService.farmCrop(index).subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }

  public sellCrop(index: Number) {
    this.restService.sellCrop(index).subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }
}
