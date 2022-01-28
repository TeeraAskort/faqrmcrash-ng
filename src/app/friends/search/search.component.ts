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
  @Output() blockPlayer: EventEmitter<String> = new EventEmitter<String>();

  public players: Page | undefined = undefined;
  public page: number = 0;
  public pages: Array<number> | undefined = undefined;

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

  public block(username: String) {
    this.blockPlayer.emit(username);
  }

  public next() {
    if (this.players) {
      this.page++;
      if (this.page > this.players.totalPages) {
        this.page = this.players.totalPages - 1;
      }
      this.reSearchPlayers();
    }
  }

  public previous() {
    if (this.players) {
      this.page--;
      if (this.page < 0) {
        this.page = 0;
      }
      this.reSearchPlayers();
    }
  }

  public goToPage(page: number) {
    if (this.players) {
      if (page >= 0 && page < this.players.totalPages) {
        this.page = page;
        this.reSearchPlayers();
      }
    }
  }

  public reSearchPlayers() {
    if (this.searchText) {
      this.restService
        .searchPlayer(this.searchText, this.page)
        .subscribe((data) => {
          if (data) {
            this.players = data;
          }
        });
    }
  }

  public assignPages() {
    if (this.players) {
      this.pages = [...Array(this.players.totalPages - 1)].map((_, i) => i * 1);
    }
  }
}
