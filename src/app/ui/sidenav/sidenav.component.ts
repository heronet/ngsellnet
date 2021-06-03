import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(private uiService: UiService) { }
  showSidebar = false;
  ngOnInit(): void {
    this.uiService.sidenavVisibie$.subscribe(res => {
      this.showSidebar = res;
    })
  }
  onHideMe() {
    this.uiService.setSidenavVisibility(false);
  }

}
