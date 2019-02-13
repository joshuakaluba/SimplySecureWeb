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
      `${this.apiUrl}/Locations/CreateLocation/`,
      location,
      this.options
    );
  }

  updateLocationArmedState(location: Location) {
    return this.http.post(
      `${this.apiUrl}/Locations/ArmLocation/`,
      location,
      this.options
    );
  }

  deleteLocation(location: Location) {
    return this.http.delete(
      `${this.apiUrl}/Locations/DeleteLocation/${location.id}`,
      this.options
    );
  }

  getAllLocations() {
    return this.http.get(`${this.apiUrl}/Locations/GetLocations`, this.options);
  }

  getLocation(locationId: string) {
    return this.http.get(
      `${this.apiUrl}/Locations/GetLocation/${locationId}`,
      this.options
    );
  }
}
