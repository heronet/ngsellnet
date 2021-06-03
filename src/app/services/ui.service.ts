import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  sidenavVisibility = new Subject<boolean>();
  sidenavVisibie$ = this.sidenavVisibility.asObservable();

  constructor() { }
  setSidenavVisibility(bool: boolean) {
    this.sidenavVisibility.next(bool);
  }
}
