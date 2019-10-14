import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AuthenticationComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: AuthenticationComponent}
        ])
     ],
    exports: [
        AuthenticationComponent,
        RouterModule
    ],
    providers: [],
})
export class AuthenticationModule {}
