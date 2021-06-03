import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sidenavOpen = false;
  sidenavVisibieSub: Subscription;
  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    this.sidenavVisibieSub = this.uiService.sidenavVisibie$.subscribe(val => {
      this.sidenavOpen = val;
    })
  }
  onSidenavToggle() {
    this.uiService.setSidenavVisibility(!this.sidenavOpen);
  }
  ngOnDestroy() {
    this.sidenavVisibieSub.unsubscribe();
  }
}
