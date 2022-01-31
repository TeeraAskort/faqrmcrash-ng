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
  public requests: FriendRequest[] | undefined = [];
  public friends: Player[] | undefined = undefined;
  public error: String | undefined = undefined;
  public searching: boolean = false;
  public searchText: String | undefined = undefined;
  public searchInputKey: Subject<void> = new Subject<void>();
  // prettier-ignore
  public friendRequestUpdate: BehaviorSubject<FriendRequest[] | undefined> = new BehaviorSubject<FriendRequest[] | undefined>(undefined);
  public blockedPlayers: Player[] | undefined = undefined;

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.restService
      .getFriendRequests()
      .subscribe({ next: this.assignRequests });

    this.restService.getFriends().subscribe({ next: this.assignFriends });

    this.restService
      .getBlockedPlayers()
      .subscribe({ next: this.assignBlockedUsers });
  }

  public addFriend(name: String) {
    this.restService.acceptFriendRequest(name).subscribe({
      next: this.assignRequests,
      error: this.assignError,
    });

    if (!this.error) {
      this.restService.getFriends().subscribe(this.assignFriends);
    }
  }

  public block(username: String) {
    this.restService.blockPlayer(username).subscribe({
      next: this.assignBlockedUsers,
      error: this.assignError,
    });
  }

  public unblock(username: String) {
    this.restService.unblockPlayer(username).subscribe({
      next: this.assignBlockedUsers,
      error: this.assignError,
    });
  }

  public unfriend(username: String) {
    this.restService.unfriend(username).subscribe({
      next: this.assignFriends,
      error: this.assignError,
    });
  }

  public sendRequest(username: String) {
    this.searching = false;
    this.restService.sendFriendRequest(username).subscribe({
      next: this.assignRequests,
      error: this.assignError,
    });
  }

  public search() {
    this.searching = true;
  }

  public keyup() {
    this.searchInputKey.next();
  }

  private assignRequests(data: any) {
    if (data) {
      this.friendRequestUpdate.next(data);
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

  private assignBlockedUsers(data: any) {
    if (data) {
      this.blockedPlayers = data;
      this.error = undefined;
    }
  }
}
