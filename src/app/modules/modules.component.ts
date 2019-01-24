import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocationService, ModuleService } from "../_services";
import { Location } from "../_models";
import { BaseComponent } from "../base/base.component";
declare var $: any;

@Component({
  selector: "app-modules",
  templateUrl: "./modules.component.html",
  styleUrls: ["./modules.component.scss"]
})
export class ModulesComponent extends BaseComponent implements OnInit, OnDestroy {
 
  private sub: any;
  private locationId: string;
  location: Location = new Location();

  reorderable: boolean = true;

  rows = [];
  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private moduleService: ModuleService
  ) {
    super();
  }

  ngOnInit() {

    this.rows = [];
    
    this.sub = this.route.params.subscribe(params => {
      this.locationId = params["locationId"];

      this.location = new Location();

      this.locationService.getLocation(this.locationId).subscribe(
        response => {
          let tempLocation = <any>response;          

          this.location.id = tempLocation.id;
          this.location.name = tempLocation.name;
          this.location.armed = tempLocation.armed;
          this.location.isSilentAlarm = tempLocation.isSilentAlarm;

          console.log(this.location);

          this.getAllModulesByLocation();
        },
        err => {
          console.log(err);
          this.loading = false;
          if (err && err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = err;
          }

          this.invalidInput = true;
        }
      );

      console.log(this.locationId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect({ selected }) {
    /*this.selectedLocation = new Location();

    this.selectedLocation.id = selected[0].id;
    this.selectedLocation.name = selected[0].name;
    this.selectedLocation.armed = selected[0].armed;
    this.selectedLocation.isSilentAlarm = selected[0].isSilentAlarm;*/

    $("#locationDetailsModal").modal("show");
  }

  getAllModulesByLocation(){
    this.moduleService.getModulesByLocation(this.locationId).subscribe(
      response => {
        this.rows = <any>response;

        console.log(this.rows);
      },
      err => {
        console.log(err);
      }
    );
  }
}
