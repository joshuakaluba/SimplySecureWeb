export class Module {
    public id: string;
    public name: string = "";
    public locationId: string = "";
    public stateDisplayed: string = "";
    public state: boolean;
    public offline: boolean;
    public isMotionDetector: boolean = false;
    public lastHeartbeat: string;
    public lastBoot: string;

    public isValidModule(): boolean {
        return this.name.length > 1;
    }
}
