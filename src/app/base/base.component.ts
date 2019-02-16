import { Component } from '@angular/core';
import * as moment from 'moment';

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

  showError(error: any) {
    if (error.error.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = error;
    }

    this.invalidInput = true;
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  public getFormattedDate(dateToFormat) {
    return moment.utc(dateToFormat).local().format("hh:mm:ss A - ddd, MMM Do, YYYY");
  }

  public getFormattedShortDate(dateToFormat) {
    return moment.utc(dateToFormat).local().format("MMM Do, YYYY");
  }

}
