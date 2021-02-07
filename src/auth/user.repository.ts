import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { AuthCredentialsDTO } from "./dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
        try {
            const { username, password } = authCredentials;

            const user = new User();

            user.username = username;
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(password, user.salt);

            await user.save();
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException("username already exists");
            }
            throw new InternalServerErrorException(error);
        }
    }

    async validatePassword(authCredentials: AuthCredentialsDTO): Promise<string> {
        try {
            const { username, password } = authCredentials;

            const user = await this.findOne({ username });

            if (user && (await user.validatePassword(password))) {
                return user.username;
            } else {
                return null;
            }
        } catch (error) {}
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
