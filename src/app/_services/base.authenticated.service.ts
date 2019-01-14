import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class BaseAuthenticatedService {
  public options: any;

  public apiUrl: string = environment.apiUrl;

  constructor() {
    let token = localStorage.getItem("simplyJwt");

    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    });

    this.options = {
      headers: headers
    };
  }
}
