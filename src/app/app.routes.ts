import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'methree'
},{
    path: 'methree',
    loadChildren: () => import("./modules/threejstst/threejstst.module").then(t => t.ThreejststModule)
}];
