import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor() {}

  isUserAuthenticated(): boolean {
    const helper = new JwtHelperService();

    let token: string = localStorage.getItem("simplyJwt");

    if (token && !helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}
