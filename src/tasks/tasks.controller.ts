import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";

@Controller("tasks")
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch("/:id/status")
    updateTaskStatus(@Body("status") status: TaskStatus, @Param("id") id: string): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string): void {
        this.tasksService.deleteTask(id);
    }
}
