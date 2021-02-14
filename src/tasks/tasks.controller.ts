import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Logger,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TaskStatusValidationPipe } from "./pipes";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./taskStatus.enum";
import { GetUser } from "src/auth/getUser.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger("Tasks Controller");

    constructor(private tasksService: TasksService) {}

    @Get()
    async getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDTO,
        @GetUser() user: User,
    ): Promise<Task[]> {
        this.logger.verbose(
            `User "${
                user.username
            }" retrieving all his tasks. Filters: ${JSON.stringify(filterDto)}`,
        );
        return this.tasksService.getAllTasks(filterDto, user);
    }

    @Get("/:id")
    async getTaskById(
        @Param("id") id: string,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" retrieving taskID:"${id}"`,
        );
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" creating a new task:${JSON.stringify(
                createTaskDTO,
            )}`,
        );
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Patch("/:id/status")
    async updateTaskStatus(
        @Body("status", TaskStatusValidationPipe) status: TaskStatus,
        @Param("id") id: string,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" updating task "${id}" status to ${status}`,
        );
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Delete("/:id")
    async deleteTask(
        @Param("id") id: string,
        @GetUser() user: User,
    ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }
}
