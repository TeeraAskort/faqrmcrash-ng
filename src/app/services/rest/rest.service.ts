import { Crop } from './../../models/crop.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';

import { Player } from '../../models/player.interface';
import { Worker } from 'src/app/models/worker.interface';

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

  public fetchPlayerData() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + 'player/login', {
      headers: loginHeaders,
    });
  }

  public farmCrop(index: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + `player/crop/${index}/farmCrop`, {
      headers: loginHeaders,
    });
  }

  public sellCrop(index: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + `player/crop/${index}/sell`, {
      headers: loginHeaders,
    });
  }

  public sellItem(index: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + `player/item/${index}/sell`, {
      headers: loginHeaders,
    });
  }

  public getAllCrops() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Crop[]>(this.url + `crop/all`, {
      headers: loginHeaders,
    });
  }

  public getAllWorkers() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Worker[]>(this.url + `worker/all`, {
      headers: loginHeaders,
    });
  }

  public getAllTasks() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Crop[]>(this.url + `task/all`, {
      headers: loginHeaders,
    });
  }

  public buyCrop(id: Number, amount: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + `player/crop/${id}/buy/${amount}`, {
      headers: loginHeaders,
    });
  }

  public hireWorker(id: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + `player/worker/${id}/hire`, {
      headers: loginHeaders,
    });
  }
}
