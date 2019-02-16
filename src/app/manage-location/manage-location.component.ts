import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ModuleService, LocationEventsService, LocationUsersService } from "../_services";
import { Module, User } from "../_models";
import { BaseComponent } from "../base/base.component";

declare var $: any;

@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.scss']
})
export class ManageLocationComponent extends BaseComponent implements OnInit, OnDestroy {

  private sub: any;
  private locationId: string;
  reorderable: boolean = true;
  selectedModule: Module = new Module();
  userToDelete: User = new User();
  newLocationUser: User = new User();
  newModuleToAdd: Module = new Module();
  modules = [];
  locationUsers = [];
  moduleEvents = [];
  locationEvents = [];

  constructor(
    private route: ActivatedRoute,
    private locationEventsService: LocationEventsService,
    private locationUsersService: LocationUsersService,
    private moduleService: ModuleService
  ) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.locationId = params["locationId"];
      this.getAllModulesByLocation();
      this.getLocationEventHistory();
      this.getModuleEventsByLocation();
      this.getLocationUsers();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAllModulesByLocation() {
    this.moduleService.getModulesByLocation(this.locationId).subscribe(
      response => {
        this.modules = <any>response;
      },
      err => {
        this.showError(err);
        this.modules = [];
      }
    );
  }

  getLocationEventHistory() {
    this.locationEventsService.getLocationEventHistory(this.locationId).subscribe(
      response => {
        this.locationEvents = <any>response;
      },
      err => {
        this.showError(err);
        this.locationEvents = [];
      }
    );
  }

  getLocationUsers() {
    this.locationUsersService.getLocationUsers(this.locationId).subscribe(
      response => {
        this.locationUsers = <any>response;
      },
      err => {
        this.showError(err);
        this.locationUsers = [];
      }
    );
  }

  selectUserToDelete(rowIndex) {
    var user = this.locationUsers[rowIndex];

    let userToDelete = new User();

    userToDelete.id = user.id;
    userToDelete.email = user.email;

    this.userToDelete = userToDelete;
  }

  getModuleEventsByLocation() {
    this.locationEventsService.getModuleEventsByLocation(this.locationId).subscribe(
      response => {
        this.moduleEvents = <any>response;
      },
      err => {
        this.showError(err);
        this.moduleEvents = [];
      }
    );
  }

  addNewLocationUser() {
    this.newLocationUser.locationId = this.locationId;

    this.locationUsersService.createNewLocationUser(this.newLocationUser).subscribe(
      response => {
        this.getLocationUsers();
        this.newLocationUser = new User();
      },
      err => {
        this.showError(err);
      }
    );
  }

  onModuleSelect({ selected }) {
    var selectedModule = new Module();

    selectedModule.id = selected[0].id;
    selectedModule.locationId = selected[0].locationId;
    selectedModule.name = selected[0].name;
    selectedModule.stateDisplayed = selected[0].stateDisplayed;
    selectedModule.lastHeartbeat = this.getFormattedDate(selected[0].lastHeartbeat);
    selectedModule.lastBoot = this.getFormattedDate(selected[0].lastBoot);


    this.selectedModule = selectedModule;
    $("#moduleDetailsModal").modal("show");
  }

  createNewModule() {
    this.newModuleToAdd.locationId = this.locationId;
    this.moduleService.createNewModule(this.newModuleToAdd).subscribe(
      response => {
        this.getAllModulesByLocation();
        this.newModuleToAdd = new Module();
      },
      err => {
        this.showError(err);
      }
    );
  }

  deleteSelectedModule() {
    this.moduleService.deleteModule(this.selectedModule).subscribe(
      response => {
        this.getAllModulesByLocation();
      },
      err => {
        this.showError(err);
      }
    );
  }

  deleteSelectedLocationUser() {
    this.locationUsersService.deleteLocationUser(this.userToDelete).subscribe(
      response => {
        this.getLocationUsers();
      },
      err => {
        this.showError(err);
      }
    );
  }
}
