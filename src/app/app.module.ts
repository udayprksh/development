import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule,  NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AuthInterceptor, ErrorInterceptor } from './shared/helpers';
import { UserIdleModule } from 'angular-user-idle';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertService } from './shared/services';
import { RolePermissions } from './shared/constants/role-permission.constant';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { GlobalErrorHandler } from './shared/helpers/global-error-handler';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
        // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes) 
        // and `ping` is 120 (2 minutes).
        UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120}), 
        NgxPermissionsModule.forRoot(),
        // level defines the minimum log level in the browser. Available levels are: TRACE, DEBUG, INFO, LOG, WARN, ERROR, FATAL and OFF.
        // serverLoggingUrl is where you give the full path to your api end-point for logging to server. 
        // This is optional, if you don’t need logs to be sen’t to server, delete this line.
        // serverLogLevel defines the minimum log level for server-side logging.
        // disableConsoleLogging is a flag which helps you to turn console logging completely off.

        LoggerModule.forRoot({
            // serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR,
            disableConsoleLogging: false
        }),
        MDBBootstrapModule.forRoot()
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        RolePermissions,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler}
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    bootstrap: [AppComponent]
})
export class AppModule {}
