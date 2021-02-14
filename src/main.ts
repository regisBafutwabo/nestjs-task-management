import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as config from "config";

async function bootstrap() {
    const logger = new Logger("bootstrap 🚀");
    const serverConfig = config.get("server");

    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === "development") {
        app.enableCors();
    }
    await app.listen(serverConfig.port);

    logger.log(`✅ Application listsening on port ${serverConfig.port}`);
}
bootstrap();
