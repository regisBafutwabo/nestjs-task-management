import { AuthService } from "./auth.service";
import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthCredentialsDTO } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    async signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(authCredentials);
    }

    @Post("/signin")
    async signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDTO): Promise<void> {
        return this.authService.signIn(authCredentials);
    }
}
