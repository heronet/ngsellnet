import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  showFilter = false;
  showSidebar = false;
  isAuthenticated = false;
  authSubscription: Subscription;
  constructor(private uiService: UiService, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.uiService.sidenavVisibie$.subscribe(res => {
      this.showSidebar = res;
    });
    this.authSubscription = this.authService.authUser$.subscribe(authData => {
      if(authData)
        this.isAuthenticated = true;
      else
        this.isAuthenticated = false;
    });
    // Show Filter screen only if currently on products page.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(event.urlAfterRedirects === "/products")
          this.showFilter = true;
        else
          this.showFilter = false;
      }
    });
  }
  onHideMe() {
    this.uiService.setSidenavVisibility(false);
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
