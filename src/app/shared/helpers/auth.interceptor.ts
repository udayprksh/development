import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { AppConstants } from '../constants/app.constant';
import { RolePermissions } from '../constants/role-permission.constant';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    currentPermissions : [];
    constructor(
            private authenticationService: AuthenticationService,
            private ngxPermissionsService : NgxPermissionsService,
            private rolePermissions: RolePermissions
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`

                }
            });

            //load permissions based on Role
            let permissions: any = [];
            currentUser.assignedRoles.forEach(x => {
                let perm: string[] = this.rolePermissions.getPermissions(x);
                this.currentPermissions = [];
                permissions = permissions.concat(perm);
                Array.prototype.push.apply(this.currentPermissions, permissions || []);
            })

            console.log(permissions);
            this.ngxPermissionsService.loadPermissions(permissions);


        }else{
            //First time authentication
            let basicAuth = 'Basic ' + btoa(AppConstants.API_SECRET_KEY + ':' + AppConstants.API_SECRET_PASSWORD);
            request = request.clone({
                setHeaders: {
                    Authorization: basicAuth,
                }
            });
        }

        return next.handle(request);
    }
}
