import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService, AuthenticationService } from "../_services";
import { AlertService } from "../_services";
import { RegisterCredentials } from "../_models";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  
  invalidInput: boolean;  
  errorMessage: string;
  loading: boolean = false;
  registerCredentials: RegisterCredentials = new RegisterCredentials();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    if(this.authenticationService.isUserAuthenticated()){
      this.router.navigate(["/locations"]);
    }
  }

  resetFormErrors(){
    this.invalidInput = false;
    this.errorMessage = "";
  }
  
  register() {

    this.resetFormErrors();

    this.loading = true;

    if (this.registerCredentials.confirmPassword != this.registerCredentials.password) {
      this.invalidInput = true;
      this.errorMessage = "Passwords do not match";
      this.loading = false;
      return;
    }

    if(this.registerCredentials.acceptedTerms!=true){
      this.invalidInput = true;
      this.errorMessage = "Please accept terms and conditions to continue.";
      this.loading = false;
      return;
    }

    if (this.registerCredentials.password.length <= 6 || this.registerCredentials.fullName.length <= 3) {
      this.invalidInput = true;
      this.errorMessage =
        "Password should be at least 6 characters. Fullname should be at least 3 characters";
        this.loading = false;
      return;
    }

    
    this.userService.register(this.registerCredentials).subscribe(
      response => {
        this.alertService.success("Registration successful", true);
        this.loading = false;

        let user = <any>response;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("simplyJwt", user.accessToken);
        this.router.navigate(["/locations"]);
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.loading = false;
        this.invalidInput = true;
      }
    );
    
  }
}
