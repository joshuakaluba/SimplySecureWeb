import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LoginCredentials, RegisterCredentials } from "../_models";

@Injectable({ providedIn: "root" })
export class UserService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register( credentials: RegisterCredentials) {
    return this.http.post(`${this.apiUrl}/Authentication/Register`, credentials);
  }

  login( credentials: LoginCredentials) {
    return this.http.post(`${this.apiUrl}/Authentication/Login`, credentials);
  }
}
