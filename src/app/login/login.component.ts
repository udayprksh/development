import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthenticationService, AlertService } from '../shared/services';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;


    constructor(
      public router: Router,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder,
      private alertService: AlertService

    ) {}

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        if(this.authenticationService.currentUserValue){
            this.router.navigate(['/dashboard']);
        }
    }

    // convenience getter for easy access to form fields
    //get formControls() { return this.loginForm.controls; }
    get f() { return this.loginForm.controls; }


    onLoggedin() {
        
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        //console.log(this.f.username.value);
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('isLoggedin', 'true');
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.alertService.error('You are not authorized !');
                });
        
    }
}
