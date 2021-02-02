import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { typeOrmConfig, configuration } from "./config";
import { TasksModule } from "./tasks/tasks.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"],
            isGlobal: true,
        }),
        TasksModule,
        TypeOrmModule.forRoot(typeOrmConfig),
    ],
})
export class AppModule {}
