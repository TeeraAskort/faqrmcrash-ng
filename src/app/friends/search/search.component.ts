import { Page } from './../../models/page.interface';
import { RestService } from 'src/app/services/rest/rest.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  @Input() searchInputKey: Observable<void> | undefined = undefined;
  @Input() searchText: String | undefined = undefined;
  @Output() sendRequest: EventEmitter<String> = new EventEmitter<String>();

  public players: Page | undefined = undefined;
  public page: number = 0;

  constructor(private restService: RestService) {
    this.searchInputKey?.subscribe(() => {
      if (this.searchText) {
        this.restService.searchPlayer(this.searchText, 0).subscribe((data) => {
          if (data) {
            this.players = data;
            this.page = this.players.pageable.pageNumber;
          }
        });
      }
    });
  }

  ngOnInit(): void {}

  public sendFriendRequest(username: String) {
    this.sendRequest.emit(username);
  }

  public block(username: String) {}
}
