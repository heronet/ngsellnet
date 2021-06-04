import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFilter = false;
  constructor(private uiService: UiService, private router: Router) { }
  showSidebar = false;
  ngOnInit(): void {
    this.uiService.sidenavVisibie$.subscribe(res => {
      this.showSidebar = res;
    });
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

}
