import { Player } from './../../models/player.interface';
import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.sass'],
})
export class CropListComponent implements OnInit {
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
