import validator from 'validator';

export class RegisterCredentials {
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    fullName: string = "";
    acceptedTerms: boolean = false;
    phoneNumber: string = "";

    public isValid(): boolean{
        return (
            (this.phoneNumber.length > 2)&&
            //(this.acceptedTerms == true)&&
            (this.password.length > 5)&&
            (this.password == this.confirmPassword) &&            
            (validator.isEmail(this.email.trim()))
        )
    }

}