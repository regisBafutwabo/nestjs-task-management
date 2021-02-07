import { PipeTransform } from "@nestjs/common";

export class AuthCredentialsValidation implements PipeTransform {
    transform(value: any) {
        console.log(value);
    }
}
