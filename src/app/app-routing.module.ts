import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './auth/login/join.component';
import { ProductsDashboardComponent } from './core/products/products-dashboard/products-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsDashboardComponent, pathMatch: 'full'},
  {path: 'login', component: JoinComponent, data: {mode: 'login'}},
  {path: 'register', component: JoinComponent, data: {mode: 'register'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
