import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "../_models";
import { BaseAuthenticatedService } from "./base.authenticated.service";

@Injectable({ providedIn: "root" })
export class LocationService extends BaseAuthenticatedService {
  constructor(private http: HttpClient) {
    super();
  }

  createNewLocation(location: Location) {
    return this.http.post(
      `${this.apiUrl}/Home/CreateNewLocation`,
      location,
      this.options
    );
  }

  updateLocation(location: Location) {
    return this.http.post(
      `${this.apiUrl}/Home/UpdateLocation`,
      location,
      this.options
    );
  }

  deleteLocation(location: Location) {
    return this.http.delete(
      `${this.apiUrl}/Home/DeleteLocation/${location.id}`,
      this.options
    );
  }

  getAllLocations() {
    return this.http.get(`${this.apiUrl}/Home/GetAllLocations`, this.options);
  }

  getLocation(locationId: string) {
    return this.http.get(
      `${this.apiUrl}/Home/GetLocation/${locationId}`,
      this.options
    );
  }
}
