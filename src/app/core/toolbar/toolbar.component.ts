import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sidenavOpen = false;
  isAuthenticated = false;
  sidenavVisibieSub: Subscription;
  authSubscription: Subscription;

  constructor(private uiService: UiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.sidenavVisibieSub = this.uiService.sidenavVisibie$.subscribe(val => {
      this.sidenavOpen = val;
    });
    this.authSubscription = this.authService.authUser$.subscribe(authData => {
      if(authData)
        this.isAuthenticated = true;
      else
        this.isAuthenticated = false;
    });
  }
  onSidenavToggle() {
    this.uiService.setSidenavVisibility(!this.sidenavOpen);
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.sidenavVisibieSub.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
