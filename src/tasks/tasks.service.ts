import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 } from "uuid";
import { CreateTaskDTO } from "./dto/createTask.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;

        const task: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: v4(),
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}
