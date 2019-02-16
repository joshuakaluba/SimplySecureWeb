export class Location {

  public id: string;
  public name: string;
  public status: string;
  public armed: boolean;
  public isSilentAlarm: boolean = false;
  public triggered: boolean;

  constructor() { }

  public isValid(): boolean {
    return this.name && this.name.trim().length >= 2;
  }
}
