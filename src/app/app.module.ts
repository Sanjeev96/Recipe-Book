import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { AuthInterceptorService } from './auth/authentication/auth-Interceptor.service';
import { RecipeModule } from './RecipeBook/recipe.module';
import { ShoppingListModule } from './ShoppingList/shopping-list.module';
import { SharedModule } from './Shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
