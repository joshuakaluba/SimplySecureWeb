import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from "@angular/core";
import { CanActivate, Router,  ActivatedRouteSnapshot, RouterStateSnapshot  } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();

    let token: string = localStorage.getItem("simplyJwt");

    if (token && !helper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
