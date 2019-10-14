import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        LoadingSpinnerComponent,
        AlertModalComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
     ],
    exports: [
        PageNotFoundComponent,
        LoadingSpinnerComponent,
        AlertModalComponent,
        DropdownDirective,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
})
export class SharedModule {}
