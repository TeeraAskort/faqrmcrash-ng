import { StorageService } from './../../services/storage/storage.service';
import { RestService } from './../../services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.sass'],
})
export class UserInfoComponent implements OnInit {
  public player: Player | undefined;
  public error: string | undefined = undefined;
  public image: File | undefined = undefined;

  constructor(
    private restService: RestService,
    private storageService: StorageService
  ) {
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
      }
    });
  }

  public onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  public changeImage() {
    if (this.image) {
      this.restService.changeImage(this.image).subscribe({
        next: (data) => {
          if (data) {
            this.player = data;
            this.error = undefined;
            this.storageService.sendSignal();
          }
        },
        error: (error) => {
          this.error = error.error;
        },
      });
    }
  }

  ngOnInit(): void {}
}
