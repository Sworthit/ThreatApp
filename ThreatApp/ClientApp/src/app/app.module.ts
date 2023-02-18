import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CommonModule } from '@angular/common';
import { AddThreatComponent } from './add-threat/add-threat.component';
import { GoogleMapsModule } from '@angular/google-maps';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AdminComponent,
    AddThreatComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'add', component: AddThreatComponent, canActivate: [AuthGuard]}
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7284"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
