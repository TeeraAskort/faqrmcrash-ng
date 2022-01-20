import { StorageService } from './../../services/storage/storage.service';
import { RestService } from './../../services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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

  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private restService: RestService,
    private storageService: StorageService
  ) {
    const checkBothPasswordsAreTheSame: ValidatorFn = (fg: AbstractControl) => {
      const password: string = fg.get('password')?.value;
      const passwordRepeat: string = fg.get('passwordRepeat')?.value;

      return password === passwordRepeat ? null : { passwordsMatch: true };
    };

    this.registerForm = new FormGroup(
      {
        username: new FormControl(this.username, [Validators.required]),
        password: new FormControl(this.password, [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordRepeat: new FormControl(this.passwordRepeat, [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: checkBothPasswordsAreTheSame }
    );
  }

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
              this.storageService.setItem('player', player.toString('base64'));
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
