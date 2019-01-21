import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocationService } from "../_services";
import { Location } from "../_models";
import { BaseComponent } from "../base/base.component";

//http://swimlane.github.io/ngx-datatable/#basic-fixed
declare var $: any;

@Component({
  selector: "app-location",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"]
})
export class LocationsComponent extends BaseComponent implements OnInit {
  
  
  newLocation: Location = new Location();
  selectedLocation: Location = new Location();
  reorderable: boolean = true;

  rows = [];

  constructor(
    private modalService: NgbModal,
    private locationService: LocationService
  ) {
    super();
    this.rows = [];
  }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe(
      response => {
        this.rows = <any>response;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSelect({ selected }) {
    this.selectedLocation = new Location();

    this.selectedLocation.id = selected[0].id;
    this.selectedLocation.name = selected[0].name;
    this.selectedLocation.armed = selected[0].armed;
    this.selectedLocation.isSilentAlarm = selected[0].isSilentAlarm;

    $("#locationDetailsModal").modal("show");
  }

  openCreateNewModal(createNewLocationModal: any) {
    this.modalService.open(createNewLocationModal);
  }

  showDeleteConfrimationModal() {
    $("#locationDetailsModal").modal("hide");
    $("#deleteLocationModal").modal("show");
  }

  confirmedLocationDelete() {
    $("#deleteLocationModal").modal("hide");

    this.loading = true;

    this.locationService.deleteLocation(this.selectedLocation).subscribe(
      response => {
        this.invalidInput = false;
        this.getAllLocations();
        this.loading = false;

        this.successMessage = "Deleted successfully";
        this.successResult = true;
      },
      err => {
        this.loading = false;
        if (err && err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err;
        }

        this.invalidInput = true;
      }
    );
  }

  resetAfterCreateNewLocation() {
    this.loading = false;
    this.modalService.dismissAll();
    this.newLocation = new Location();
  }

  saveLocationChanges() {
    this.loading = true;

    this.locationService.updateLocation(this.selectedLocation).subscribe(
      response => {
        this.invalidInput = false;
        this.getAllLocations();
        this.loading = false;
        $("#locationDetailsModal").modal("hide");
        this.successMessage = "Modified successfully";
        this.successResult = true;
      },
      err => {
        this.loading = false;

        $("#locationDetailsModal").modal("hide");

        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err;
        }

        this.invalidInput = true;
      }
    );
  }

  createNewLocation() {
    this.loading = true;

    console.log(this.newLocation);

    this.locationService.createNewLocation(this.newLocation).subscribe(
      response => {
        this.invalidInput = false;
        this.getAllLocations();
        this.resetAfterCreateNewLocation();
        this.successMessage = "Saved successfully";
        this.successResult = true;
      },
      err => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err;
        }

        this.invalidInput = true;
        this.resetAfterCreateNewLocation();
      }
    );
  }
}
