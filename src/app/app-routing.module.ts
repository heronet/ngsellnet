import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './auth/join/join.component';
import { AddProductComponent } from './core/products/add-product/add-product.component';
import { ProductViewComponent } from './core/products/product-view/product-view.component';
import { ProductsDashboardComponent } from './core/products/products-dashboard/products-dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { SecurityGuard } from './guards/security.guard';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsDashboardComponent},
  {path: 'products/add-product', component: AddProductComponent, canActivate: [SecurityGuard]},
  {path: 'products/:id', component: ProductViewComponent},
  {path: 'login', component: JoinComponent, data: {mode: 'login'}, canActivate: [LoginGuard]},
  {path: 'register', component: JoinComponent, data: {mode: 'register'}, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
