import { Player } from './../../models/player.interface';
import { RestService } from './../../services/rest/rest.service';
import { FriendRequest } from './../../models/friendRequest.interface';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass'],
})
export class FriendsComponent implements OnInit {
  public requests: FriendRequest[] | undefined = undefined;
  public friends: Player[] | undefined = undefined;
  public error: String | undefined = undefined;
  public searching: boolean = false;
  public searchText: String | undefined = undefined;
  public searchInputKey: Subject<void> = new Subject<void>();

  constructor(private restService: RestService) {
    this.restService.getFriendRequests().subscribe(this.assignRequests);

    this.restService.getFriends().subscribe(this.assignFriends);

    let searchInput = document.querySelector('#search');

    searchInput?.addEventListener('focusin', () => {
      this.searching = true;
      searchInput?.addEventListener('keyup', () => {
        this.searchInputKey.next();
      });
    });
  }

  ngOnInit(): void {}

  public addFriend(name: String) {
    this.restService.acceptFriendRequest(name).subscribe({
      next: this.assignRequests,
      error: this.assignError,
    });

    if (!this.error) {
      this.restService.getFriends().subscribe(this.assignFriends);
    }
  }

  public block(username: String) {}

  public unfriend(username: String) {
    this.restService.unfriend(username).subscribe({
      next: this.assignFriends,
      error: this.assignError,
    });
  }

  private assignRequests(data: any) {
    if (data) {
      this.requests = data;
      this.error = undefined;
    }
  }

  private assignError(error: any) {
    this.error = error.error;
  }

  private assignFriends(data: any) {
    if (data) {
      this.friends = data;
      this.error = undefined;
    }
  }
}
