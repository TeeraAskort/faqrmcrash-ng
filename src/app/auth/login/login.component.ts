import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public username: String = '';
  public password: String = '';
  public error: any = undefined;

  constructor(private router: Router, private restService: RestService) {}

  ngOnInit(): void {}

  public login() {
    if (this.username && this.password) {
      this.error = undefined;
      this.restService.login(this.username, this.password).subscribe((data) => {
        if (data) {
          let player = Buffer.from(this.username + ':' + this.password);
          localStorage.setItem('player', player.toString('base64'));
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.error = 'You need to enter your username and password';
    }
  }
}
