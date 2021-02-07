import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import config from "./config.dotenv";

const conf = config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: conf.database.host,
    port: +conf.database.port,
    username: conf.database.username,
    password: conf.database.password,
    database: conf.database.name,
    synchronize: true,
    autoLoadEntities: true,
};
