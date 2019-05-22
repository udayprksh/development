import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReverseStringPipe } from './reverse-string.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ReverseStringPipe,
        CapitalizePipe,
        TruncatePipe
    ]
})
export class SharedPipesModule { }
