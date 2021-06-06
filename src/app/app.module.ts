import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './ui/background/background.component';
import { CoreComponent } from './core/core.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { JoinComponent } from './auth/join/join.component';
import { ProductsDashboardComponent } from './core/products/products-dashboard/products-dashboard.component';
import { ProductsQueryComponent } from './core/products/products-query/products-query.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { TokenInterceptor } from './utils/token.interceptor';
import { AddProductComponent } from './core/products/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    CoreComponent,
    ToolbarComponent,
    JoinComponent,
    ProductsDashboardComponent,
    ProductsQueryComponent,
    SidenavComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
