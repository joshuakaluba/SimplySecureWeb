import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {

  public loading: boolean = false;
  public invalidInput: boolean = false;
  public errorMessage: string = "";
  public successMessage: string = "";
  public successResult: boolean = false;

  constructor() { }
}
