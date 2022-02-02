import { Player } from './../../models/player.interface';
import { RestService } from './../../services/rest/rest.service';
import { FriendRequest } from './../../models/friendRequest.interface';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass'],
})
export class FriendsComponent implements OnInit {
  public requests: FriendRequest[] = [];
  public friends: Player[] | undefined = undefined;
  public error: String | undefined = undefined;
  public searching: boolean = false;
  public searchText: String | undefined = undefined;
  public searchInputKey: Subject<void> = new Subject<void>();
  // prettier-ignore
  public friendRequestUpdate: BehaviorSubject<FriendRequest[] | undefined> = new BehaviorSubject<FriendRequest[] | undefined>(undefined);
  // prettier-ignore
  public blockedPlayersUpdate: BehaviorSubject<Player[] | undefined> = new BehaviorSubject<Player[] | undefined>(undefined);
  public blockedPlayers: Player[] | undefined = undefined;
  private that = this;

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getFriendRequests().subscribe({
      next: (data) => {
        this.assignRequests(data, this.that);
      },
    });

    this.restService.getFriends().subscribe({
      next: (data) => {
        this.assignFriends(data, this.that);
      },
    });

    this.restService.getBlockedPlayers().subscribe({
      next: (data) => {
        this.assignBlockedUsers(data, this.that);
      },
    });
  }

  public addFriend(name: String) {
    this.restService.acceptFriendRequest(name).subscribe({
      next: (data) => {
        this.assignRequests(data, this.that);
      },
      error: this.assignError,
    });

    if (!this.error) {
      setTimeout(() => {
        this.restService.getFriends().subscribe({
          next: (data) => {
            this.assignFriends(data, this.that);
          },
        });
      }, 2000);
    }
  }

  public block(username: String) {
    this.restService.blockPlayer(username).subscribe({
      next: (data) => {
        this.assignBlockedUsers(data, this.that);
      },
      error: this.assignError,
    });

    if (!this.error) {
      setTimeout(() => {
        this.restService.getFriends().subscribe({
          next: (data) => {
            this.assignFriends(data, this.that);
          },
        });
      }, 2000);
    }
  }

  public unblock(username: String) {
    this.restService.unblockPlayer(username).subscribe({
      next: (data) => {
        this.assignBlockedUsers(data, this.that);
      },
      error: this.assignError,
    });
  }

  public unfriend(username: String) {
    this.restService.unfriend(username).subscribe({
      next: (data) => {
        this.assignFriends(data, this.that);
      },
      error: this.assignError,
    });
  }

  public sendRequest(username: String) {
    this.searching = false;
    this.restService.sendFriendRequest(username).subscribe({
      next: (data) => {
        this.assignRequests(data, this.that);
      },
      error: this.assignError,
    });
  }

  public search() {
    this.searching = true;
  }

  public keyup() {
    this.searchInputKey.next();
  }

  private assignRequests(data: any, that: any) {
    if (data) {
      that.friendRequestUpdate.next(data);
      this.error = undefined;
    }
  }

  private assignError(error: any) {
    this.error = error.error;
  }

  private assignFriends(data: any, that: any) {
    if (data) {
      that.friends = data;
      this.error = undefined;
    }
  }

  private assignBlockedUsers(data: any, that: any) {
    if (data) {
      that.blockedPlayersUpdate.next(data);
      this.error = undefined;
    }
  }
}
