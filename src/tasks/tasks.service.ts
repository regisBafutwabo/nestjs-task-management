import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTasksFilterDTO } from "./dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getAllTasks(
        filterDTO: GetTasksFilterDTO,
        user: User,
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({
            where: { id, userId: user.id },
        });

        if (!found) {
            throw new NotFoundException(`task with id:"${id}" was not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.taskRepository.delete({
            id,
            userId: user.id,
        });

        if (result.affected === 0) {
            throw new NotFoundException(`task with id:"${id}" was not found`);
        }
    }

    async updateTaskStatus(
        id: string,
        status: TaskStatus,
        user: User,
    ): Promise<Task> {
        const task = await this.getTaskById(id, user);

        return this.taskRepository.updateTask(task, status, user);
    }
}
