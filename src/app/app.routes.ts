import { Routes } from '@angular/router';
import { HomeComponent } from './modules/threejstst/home/home.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent
},{
    path: 'methree',
    loadChildren: () => import("./modules/threejstst/threejstst.module").then(t => t.ThreejststModule)
}];
