import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseAuthenticatedService } from "./base.authenticated.service";
import { Module } from "../_models";

@Injectable({ providedIn: "root" })
export class ModuleService extends BaseAuthenticatedService {
  constructor(private http: HttpClient) {
    super();
  }

  getModulesByLocation(locationId: string) {
    return this.http.get(
      `${this.apiUrl}/Modules/GetModulesByLocation/${locationId}`,
      this.options
    );
  }

  createNewModule(module: Module) {
    return this.http.post(
      `${this.apiUrl}/Modules/CreateNewModule/`,
      module,
      this.options
    );
  }

  deleteModule(module: Module) {
    return this.http.delete(
      `${this.apiUrl}/Modules/DeleteModule/${module.id}`,
      this.options
    );
  }
}
