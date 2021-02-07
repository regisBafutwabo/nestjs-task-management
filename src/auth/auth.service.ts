import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepository } from "./user.repository";
import { AuthCredentialsDTO } from "./dto";
import { IAuth } from "./auth.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(
        authCredentials: AuthCredentialsDTO,
    ): Promise<IAuth.SignInResponse> {
        try {
            const username = await this.userRepository.validatePassword(
                authCredentials,
            );

            if (!username) {
                throw new UnauthorizedException("Invalid Credentials");
            }

            const payload: IAuth.JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } catch (error) {}
    }
}
