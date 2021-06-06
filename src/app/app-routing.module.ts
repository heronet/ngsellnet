import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './auth/join/join.component';
import { AddProductComponent } from './core/products/add-product/add-product.component';
import { ProductsDashboardComponent } from './core/products/products-dashboard/products-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsDashboardComponent},
  {path: 'products/add-product', component: AddProductComponent},
  {path: 'login', component: JoinComponent, data: {mode: 'login'}},
  {path: 'register', component: JoinComponent, data: {mode: 'register'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
