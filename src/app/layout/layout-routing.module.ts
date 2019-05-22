import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { Role } from '../shared/models/role';
import { NgxPermissionsGuard } from 'ngx-permissions';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule'},
            { path: 'charts2', loadChildren: './charts/charts.module#ChartsModule',
              canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['ADD_USERA'],
                        except: ['ADMIN'],
                        redirectTo: '/chartcccs'
                    }
                }
            },
        ],
        data: { roles: [Role.Admin] }  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule {}
