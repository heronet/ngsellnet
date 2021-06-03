import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit, OnDestroy {
  sidenavOn = false;
  sidenavVisibieSub: Subscription;

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    this.sidenavVisibieSub = this.uiService.sidenavVisibie$.subscribe(val => {
      this.sidenavOn = val;
    })
  }
  ngOnDestroy() {
    this.sidenavVisibieSub.unsubscribe();
  }
}
