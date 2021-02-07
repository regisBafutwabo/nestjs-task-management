import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDTO } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(authCredentials: AuthCredentialsDTO) {
        const username = await this.userRepository.validatePassword(authCredentials);

        if (!username) {
            throw new UnauthorizedException("Invalid Credentials");
        }
    }
}
