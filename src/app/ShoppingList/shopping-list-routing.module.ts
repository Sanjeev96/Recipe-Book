import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from '../auth/authentication/auth-guard';


const shoppingRoutes: Routes = [
    {
     path: 'shopping-list',
     component: ShoppingListComponent,
     canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(shoppingRoutes)
    ],
    exports: [RouterModule],
    providers: [],
})
export class ShoppingListRoutingModule {}
