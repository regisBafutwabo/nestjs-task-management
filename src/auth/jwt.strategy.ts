import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";

import config from "../config/config.dotenv";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config().jwt.secret,
        });
    }

    async validate(payload: JwtPayload) {
        try {
            const { username } = payload;

            const user = await this.userRepository.findOne({ username });

            if (!user) {
                throw new UnauthorizedException();
            }

            return user;
        } catch (error) {
            console.error(error);
        }
    }
}
