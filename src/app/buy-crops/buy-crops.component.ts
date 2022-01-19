import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest/rest.service';
import { Crop } from './../models/crop.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-crops',
  templateUrl: './buy-crops.component.html',
  styleUrls: ['./buy-crops.component.sass'],
})
export class BuyCropsComponent implements OnInit {
  public crops: Crop[] | undefined = undefined;
  public error: string | undefined = undefined;

  constructor(private restService: RestService, private router: Router) {
    this.restService.getAllCrops().subscribe((data) => {
      if (data) {
        this.crops = data;
      }
    });
  }

  ngOnInit(): void {}

  public buy(id: Number, amount: string) {
    if (amount) {
      let resAmount: Number = parseInt(amount);
      this.restService.buyCrop(id, resAmount).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.error = error.error;
        },
      });
    }
  }
}
