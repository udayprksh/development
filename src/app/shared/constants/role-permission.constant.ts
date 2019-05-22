import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class RolePermissions {

    public RoleAndPermission = [
        { 
            key:'ROLE_ADMIN',
            value: [
                'ADD_LOCATION',
                'EDIT_LOCATION',
                'ADD_DIGITAL_FILE',
                'EDIT_DIGITAL_FILE',
                'DOWNLOAD_DIGITAL_FILE',
                'ADD',
                'EDIT',
                'DELETE',
                'VIEW']
        },
        { 
            key:'superadmin',
            value: [
                'ADD_USER',
            ]
        }
    ]
    

    getPermissions(role): string[] {
        let permissionArray = this.RoleAndPermission.find(x => x.key == role);
        return (permissionArray)?permissionArray.value:[];
    }

}
