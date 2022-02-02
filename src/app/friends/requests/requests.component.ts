import { Observable } from 'rxjs';
import { FriendRequest } from './../../models/friendRequest.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass'],
})
export class RequestsComponent implements OnInit {
  @Output() addFriend: EventEmitter<String> = new EventEmitter<String>();
  @Input() friendRquestsUpdate: Observable<FriendRequest[] | undefined> =
    new Observable();

  public requests: FriendRequest[] | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    this.friendRquestsUpdate?.subscribe((data) => {
      if (data) {
        this.requests = [...data];
      }
    });
  }

  public acceptFriendRequest(name: String) {
    this.addFriend.emit(name);
  }
}
