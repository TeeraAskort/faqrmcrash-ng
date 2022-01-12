import { Player } from './../models/player.interface';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.interface';

@Component({
  selector: 'app-hire-worker',
  templateUrl: './hire-worker.component.html',
  styleUrls: ['./hire-worker.component.sass'],
})
export class HireWorkerComponent implements OnInit {
  public workers: Worker[] | undefined = undefined;
  public player: Player | undefined = undefined;

  constructor(private restService: RestService, private router: Router) {
    this.restService.fetchPlayerData().subscribe((data) => {
      if (data) {
        this.player = data;
        this.restService.getAllWorkers().subscribe((data) => {
          if (data) {
            if (this.player?.workers.length !== 0) {
              for (let worker of data) {
                let alreadyHired = false;
                this.player?.workers.forEach((wHired) => {
                  if (wHired.name === worker.name) {
                    alreadyHired = true;
                  }
                });
                worker.playerHired = alreadyHired;
              }
            }
            this.workers = data;
          }
        });
      }
    });
  }

  ngOnInit(): void {}

  public hireWorker(id: Number) {
    this.restService.hireWorker(id).subscribe((data) => {
      if (data) {
        this.router.navigate(['/home']);
      }
    });
  }
}
