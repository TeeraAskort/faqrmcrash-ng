import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageSubject = new Subject<String>();

  public watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  public setItem(key: string, data: string) {
    localStorage.setItem(key, data);
    this.storageSubject.next('changed');
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
    this.storageSubject.next('changed');
  }

  constructor() {}
}
