import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepository } from "./user.repository";
import { AuthCredentialsDTO } from "./dto";
import { SignInResponse, JwtPayload } from "./auth.interface";

@Injectable()
export class AuthService {
    private logger = new Logger("Auth Service");

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(authCredentials: AuthCredentialsDTO): Promise<SignInResponse> {
        try {
            const username = await this.userRepository.validatePassword(
                authCredentials,
            );

            if (!username) {
                throw new UnauthorizedException("Invalid Credentials");
            }

            const payload: JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload);
            this.logger.debug(
                `🛠 Generated JWT Token with payload:${JSON.stringify(payload)}`,
            );

            return { accessToken };
        } catch (error) {}
    }
}
