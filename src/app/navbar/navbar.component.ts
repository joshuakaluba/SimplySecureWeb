import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationService } from "../_services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) {}

  isUserAuthenticated() {
    return this.authenticationService.isUserAuthenticated();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  ngOnInit() {}

  signOut() {
    localStorage.removeItem("simplyJwt");
    localStorage.removeItem("user");
    this.router.navigate(["/"]);

    this.modalService.dismissAll();
  }
}
