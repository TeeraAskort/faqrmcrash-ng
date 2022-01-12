import { RestService } from './../../services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  public username: String = '';
  public password: String = '';
  public passwordRepeat: String = '';
  public error: any = undefined;

  constructor(private router: Router, private restService: RestService) {}

  ngOnInit(): void {}

  public register(): void {
    if (this.username && this.password && this.passwordRepeat) {
      this.error = undefined;
      if (this.password === this.passwordRepeat) {
        this.restService
          .register(this.username, this.password, this.passwordRepeat)
          .subscribe((data) => {
            let player = Buffer.from(this.username + ':' + this.password);
            if (data) {
              localStorage.setItem('player', player.toString('base64'));
              this.router.navigate(['/home']);
            }
          });
      } else {
        this.error = 'Passwords do not match';
      }
    } else {
      this.error = 'You need to enter your username and password';
    }
  }
}
