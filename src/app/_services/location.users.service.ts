import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../_models";
import { BaseAuthenticatedService } from "./base.authenticated.service";

@Injectable({ providedIn: "root" })
export class LocationUsersService extends BaseAuthenticatedService {
    constructor(private http: HttpClient) {
        super();
    }
    getLocationUsers(locationId: String) {
        return this.http.get(
            `${this.apiUrl}/LocationUsers/GetLocationUsers/${locationId}`,
            this.options
        );
    }

    createNewLocationUser(user: User) {
        return this.http.post(
            `${this.apiUrl}/LocationUsers/CreateNewLocationUser/`,
            user,
            this.options
        );
    }

    deleteLocationUser(user: User) {
        return this.http.delete(
            `${this.apiUrl}/LocationUsers/DeleteLocationUser/${user.id}`,
            this.options
        );
    }
}