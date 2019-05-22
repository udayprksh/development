import { Component, OnInit, OnDestroy,  ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    @ViewChild('alert') alert: ElementRef;


    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    closeAlert(){
        this.message = "";
        // this.alert.nativeElement.remove();
    }
}
