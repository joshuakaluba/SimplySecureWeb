import validator from 'validator';

export class User {
    id: number;
    username: string;
    email: string = "";
    password: string;
    confirmPassword: string;
    fullName: string;
    locationId: string;
    token: string;

    public isValidEmail(): boolean {
        return validator.isEmail(this.email.trim());
    }
}