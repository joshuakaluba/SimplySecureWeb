import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocationService } from "../_services";
import { Location } from "../_models";
import { BaseComponent } from "../base/base.component";

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
        this.showError(err);
      }
    );
  }

  onSelect({ selected }) {
    this.selectedLocation = new Location();

    this.selectedLocation.id = selected[0].id;
    this.selectedLocation.name = selected[0].name;
    this.selectedLocation.armed = selected[0].armed;
    this.selectedLocation.isSilentAlarm = selected[0].isSilentAlarm;
    this.selectedLocation.status = selected[0].status;

    $("#locationDetailsModal").modal("show");
  }

  openCreateNewModal(createNewLocationModal: any) {
    this.modalService.open(createNewLocationModal);
  }

  confirmedLocationDelete() {

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
        this.showError(err);
      }
    );
  }

  resetPage() {
    this.loading = false;
    this.modalService.dismissAll();
    this.newLocation = new Location();
  }

  updateLocationArmedState() {
    this.selectedLocation.armed = !this.selectedLocation.armed;

    this.locationService.updateLocationArmedState(this.selectedLocation).subscribe(
      response => {
        this.getAllLocations();
        this.successMessage = `${this.selectedLocation.armed == true ? 'Armed' : 'Disarmed'} successfully`;
        this.successResult = true;
      },
      err => {
        this.showError(err);
        this.resetPage();
      }
    );
  }

  createNewLocation() {
    this.loading = true;

    this.locationService.createNewLocation(this.newLocation).subscribe(
      response => {
        this.invalidInput = false;
        this.getAllLocations();
        this.resetPage();
        this.successMessage = "Saved successfully";
        this.successResult = true;
      },
      err => {
        this.showError(err);
        this.resetPage();
      }
    );
  }
}
