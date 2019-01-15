import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';
import { AuthGuard } from './guards/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { LocationsComponent } from './locations/locations.component';
import { FooterComponent } from './footer/footer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PrivacyComponent } from './privacy/privacy.component';
import { ModulesComponent } from './modules/modules.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    LocationsComponent,
    FooterComponent,
    PrivacyComponent,
    ModulesComponent,
    BaseComponent
  ],
  imports: [
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    NgxDatatableModule,
    BrowserModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
