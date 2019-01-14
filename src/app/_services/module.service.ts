import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseAuthenticatedService } from "./base.authenticated.service";

@Injectable({ providedIn: "root" })
export class ModuleService extends BaseAuthenticatedService {
  constructor(private http: HttpClient) {
    super();
  }

  getModulesByLocation(locationId: string) {
    return this.http.get(
      `${this.apiUrl}/Home/GetModulesByLocation/${locationId}`,
      this.options
    );
  }
}
