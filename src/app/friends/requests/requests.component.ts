import { FriendRequest } from './../../models/friendRequest.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass'],
})
export class RequestsComponent implements OnInit {
  @Output() addFriend: EventEmitter<String> = new EventEmitter<String>();
  @Input() requests: FriendRequest[] | undefined = undefined;

  constructor() {}

  ngOnInit(): void {}

  public acceptFriendRequest(name: String) {
    this.addFriend.emit(name);
  }
}
