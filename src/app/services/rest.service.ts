import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from '../models/player.interface';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private url = 'http://localhost:4040/api/v1/';

  constructor(private http: HttpClient) {}

  public login(username: String, password: String) {
    let playerStr = Buffer.from(username + ':' + password);
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + playerStr.toString('base64'),
    });
    return this.http.get<Player>(this.url + 'player/login', {
      headers: loginHeaders,
    });
  }

  public register(username: String, password: String, passwordRepeat: String) {
    const body = {
      name: username,
      password: password,
      passwordRepeat: passwordRepeat,
    };

    const registerHeaders: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });

    return this.http.post<Player>(this.url + 'player/create', body, {
      headers: registerHeaders,
    });
  }
}
