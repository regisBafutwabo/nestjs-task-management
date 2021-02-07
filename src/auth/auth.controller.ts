import { AuthService } from "./auth.service";
import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthCredentialsDTO } from "./dto";
import { IAuth } from "./auth.interface";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    async signUp(
        @Body(ValidationPipe) authCredentials: AuthCredentialsDTO,
    ): Promise<void> {
        return this.authService.signUp(authCredentials);
    }

    @Post("/signin")
    async signIn(
        @Body(ValidationPipe) authCredentials: AuthCredentialsDTO,
    ): Promise<IAuth.SignInResponse> {
        return this.authService.signIn(authCredentials);
    }
}
