import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewthreejststComponent } from './page/viewthreejstst/viewthreejstst.component' 
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'meviewthree',
  pathMatch: 'full'
},{
  path: 'meviewthree',
  component: HomeComponent
},{
  path: 'methreecube',
  loadComponent: () => import("./page/viewthreejstst/viewthreejstst.component").then(c => c.ViewthreejststComponent)
},{
  path: 'methreecuberubik',
  loadComponent: () => import('./page/viewthreejscuborubik/viewthreejscuborubik.component').then(cr => cr.ViewthreejscuborubikComponent)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreejststRoutingModule { }
