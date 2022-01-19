import { RestService } from './../../services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Player } from 'src/app/models/player.interface';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
})
export class ChangePasswordComponent implements OnInit {
  public oldPass: String | undefined = undefined;
  public newPass: String | undefined = undefined;
  public newPassRepeat: String | undefined = undefined;

  public player: Player | undefined = undefined;

  public error: String | undefined = undefined;

  constructor(
    private restService: RestService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }

  ngOnInit(): void {}

  public changePassword() {
    if (this.oldPass && this.newPass && this.newPassRepeat) {
      if (this.newPass === this.newPassRepeat) {
        this.restService
          .changePassword(this.oldPass, this.newPass, this.newPassRepeat)
          .subscribe({
            next: (data) => {
              if (data) {
                let player = Buffer.from(
                  this.player?.name + ':' + this.newPass
                );
                this.storageService.setItem(
                  'player',
                  player.toString('base64')
                );
                this.router.navigate(['/user-info']);
              }
            },
            error: (error) => {
              this.error = error.error;
            },
          });
      } else {
        this.error = 'Passwords do not match';
      }
    } else {
      this.error = 'You have to enter all data';
    }
  }
}
