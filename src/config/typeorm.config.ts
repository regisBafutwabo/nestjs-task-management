import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import configuration from "./config.dotenv";

const config = configuration();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: config.database.host,
    port: +config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    synchronize: true,
    autoLoadEntities: true,
};
