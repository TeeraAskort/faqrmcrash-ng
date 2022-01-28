import { FriendRequest } from './../../models/friendRequest.interface';
import { Page } from './../../models/page.interface';
import { PlayerListEntry } from './../../models/PlayerListEntry.interface';
import { Task } from './../../models/task.interface';
import { Crop } from './../../models/crop.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';

import { Player } from '../../models/player.interface';
import { Worker } from 'src/app/models/worker.interface';
import { ChartData } from 'chart.js';

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
    return this.http.get<Task[]>(this.url + `task/all`, {
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

  public fetchStats() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<ChartData>(this.url + `player/stats`, {
      headers: loginHeaders,
    });
  }

  public fetchLeaderboard() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<PlayerListEntry[]>(this.url + `player/leaderboard`, {
      headers: loginHeaders,
    });
  }

  public assignTask(id: Number, index: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player[]>(
      this.url + `player/worker/${index}/assignTask/${id}`,
      {
        headers: loginHeaders,
      }
    );
  }

  public changeImage(image: File) {
    const formData: FormData = new FormData();

    formData.append('file', image, image.name);
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.post<Player>(this.url + `player/uploadImage`, formData, {
      headers: loginHeaders,
    });
  }

  public changePassword(
    oldPass: String,
    newPass: String,
    newPassRepeat: String
  ) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.post<Player>(
      this.url + `player/changePassword`,
      {
        oldPass: oldPass,
        newPass: newPass,
        newPassRepeat: newPassRepeat,
      },
      {
        headers: loginHeaders,
      }
    );
  }

  public searchPlayer(username: String, page: number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<Page>(
      this.url + `player/searchUsers/${username}/${page}`,
      {
        headers: loginHeaders,
      }
    );
  }

  public getFriendRequests() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<FriendRequest[]>(
      this.url + `player/getFriendRequests`,
      {
        headers: loginHeaders,
      }
    );
  }

  public sendFriendRequest(username: String) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<FriendRequest[]>(
      this.url + `player/sendFriendRequest/${username}`,
      {
        headers: loginHeaders,
      }
    );
  }

  public acceptFriendRequest(username: String) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<FriendRequest[]>(
      this.url + `player/acceptRequest/${username}`,
      {
        headers: loginHeaders,
      }
    );
  }

  public getFriends() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<Player[]>(this.url + `player/getFriends`, {
      headers: loginHeaders,
    });
  }

  public unfriend(username: String) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<FriendRequest[]>(
      this.url + `player/unfriend/${username}`,
      {
        headers: loginHeaders,
      }
    );
  }

  public getBlockedPlayers() {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<Player[]>(this.url + 'player/getBlockedPlayers', {
      headers: loginHeaders,
    });
  }

  public blockPlayer(username: String) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<Player[]>(this.url + `player/block/${username}`, {
      headers: loginHeaders,
    });
  }

  public unblockPlayer(username: String) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });

    return this.http.get<Player[]>(this.url + `player/unblock/${username}`, {
      headers: loginHeaders,
    });
  }
}
