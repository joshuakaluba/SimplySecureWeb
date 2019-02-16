import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  userEmail: string = "";

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) { }

  isUserAuthenticated() {
    return this.authenticationService.isUserAuthenticated();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: "logoutModal" });
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));

    if (user != null && user.email && user.email.length > 1) {
      this.userEmail = `Hi ${user.email}!`;
    }
  }

  signOut() {
    localStorage.removeItem("simplyJwt");
    localStorage.removeItem("user");
    this.router.navigate(["/"]);

    this.modalService.dismissAll();
  }
}
