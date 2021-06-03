import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './ui/background/background.component';
import { CoreComponent } from './core/core.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsDashboardComponent } from './core/products-dashboard/products-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    CoreComponent,
    ToolbarComponent,
    LoginComponent,
    ProductsDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
