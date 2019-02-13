import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "../_models";
import { BaseAuthenticatedService } from "./base.authenticated.service";

@Injectable({ providedIn: "root" })
export class LocationEventsService extends BaseAuthenticatedService {
    constructor(private http: HttpClient) {
        super();
    }
    getLocationEventHistory(locationId: String) {
        return this.http.get(
            `${this.apiUrl}/LocationActionEvents/GetLocationHistory/${locationId}`,
            this.options
        );
    }

    getModuleEventsByLocation(locationId: String) {
        return this.http.get(
            `${this.apiUrl}/Modules/GetModuleEventsByLocation/${locationId}`,
            this.options
        );

    }
}
