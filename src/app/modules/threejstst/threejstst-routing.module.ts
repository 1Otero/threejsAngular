import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
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
