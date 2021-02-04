import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTasksFilterDTO } from "./dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getAllTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`task with id:"${id}" was not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`task with id:"${id}" was not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);

        return this.taskRepository.updateTask(task, status);
    }
}
