import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass'],
})
export class ItemListComponent implements OnInit {
  public player: Player | undefined = undefined;

  constructor(private restService: RestService) {
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }

  ngOnInit(): void {}

  public sellItem(index: Number) {
    this.restService.sellItem(index).subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }
}
