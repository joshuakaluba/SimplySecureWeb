import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService, AuthenticationService, AlertService } from "../_services";

@Component({ templateUrl: "login.component.html" })
export class LoginComponent implements OnInit {
  invalidInput: boolean;
  loading: boolean = false;
  errorMessage: string;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }
  ngOnInit() {
    if (this.authenticationService.isUserAuthenticated()) {
      this.router.navigate(["/locations"]);
      return;
    }

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  login(form: NgForm) {
    this.loading = true;
    this.userService.login(form.value).subscribe(
      response => {
        this.loading = false;

        let user = <any>response;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("simplyJwt", user.accessToken);
        this.router.navigate(["/locations"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        this.invalidInput = true;
      }
    );
  }
}
