import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewthreejststComponent } from './viewthreejstst/viewthreejstst.component' 

const routes: Routes = [{
  path: '',
  redirectTo: 'meviewthree',
  pathMatch: 'full'
},{
  path: 'meviewthree',
  loadComponent: () => import("./viewthreejstst/viewthreejstst.component").then(v => v.ViewthreejststComponent)
},{
  path: 'methree',
  component: ViewthreejststComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreejststRoutingModule { }
