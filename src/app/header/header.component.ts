import { RestService } from 'src/app/services/rest/rest.service';
import { Player } from 'src/app/models/player.interface';
import { StorageService } from './../services/storage/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public logged: boolean;
  public player: Player | undefined;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private restService: RestService
  ) {
    this.logged = localStorage.getItem('player') !== null;
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
    this.storageService.watchStorage().subscribe(() => {
      this.logged = localStorage.getItem('player') !== null;
      this.restService.fetchPlayerData().subscribe((data) => {
        if (data) {
          this.player = data;
        }
      });
    });
  }

  ngOnInit(): void {}

  public logout() {
    this.storageService.removeItem('player');
    this.router.navigate(['/login']);
  }
}
