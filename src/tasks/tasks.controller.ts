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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TaskStatusValidationPipe } from "./pipes";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./taskStatus.enum";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDTO,
    ): Promise<Task[]> {
        return this.tasksService.getAllTasks(filterDto);
    }

    @Get("/:id")
    async getTaskById(@Param("id") id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch("/:id/status")
    async updateTaskStatus(
        @Body("status", TaskStatusValidationPipe) status: TaskStatus,
        @Param("id") id: string,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete("/:id")
    async deleteTask(@Param("id") id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
