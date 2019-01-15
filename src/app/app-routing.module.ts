import { AuthGuard } from "./guards/auth-guard.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LocationsComponent } from "./locations/locations.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { ModulesComponent } from "./modules/modules.component";

const routes: Routes = [
  
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "privacy", component: PrivacyComponent },
  {
    path: "locations",
    component: LocationsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "modules/:locationId", 
    component: ModulesComponent, 
    canActivate: [AuthGuard]
   },
   { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
