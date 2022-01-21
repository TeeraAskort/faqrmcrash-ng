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
  public error: String | undefined = undefined;

  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private restService: RestService,
    private storageService: StorageService
  ) {
    const checkBothPasswordsAreTheSame: ValidatorFn = (fg: AbstractControl) => {
      const password: string = fg.get('password')?.value;
      const passwordRepeat: string = fg.get('passwordRepeat')?.value;

      return password === passwordRepeat ? null : { passwordsDontMatch: true };
    };

    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordRepeat: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: checkBothPasswordsAreTheSame }
    );
  }

  ngOnInit(): void {}

  public register(): void {
    if (this.registerForm.valid) {
      this.error = undefined;
      const password: String = this.registerForm.controls['password'].value;
      const passwordRepeat: String =
        this.registerForm.controls['passwordRepeat'].value;
      if (password === passwordRepeat) {
        const username = this.registerForm.controls['username'].value;
        this.restService
          .register(username, password, passwordRepeat)
          .subscribe({
            next: (data) => {
              let player = Buffer.from(username + ':' + password);
              if (data) {
                this.storageService.setItem(
                  'player',
                  player.toString('base64')
                );
                this.router.navigate(['/home']);
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
      this.error = 'You need to enter your username and password';
    }
  }
}
