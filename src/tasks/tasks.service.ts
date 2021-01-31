import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 } from "uuid";
import { CreateTaskDTO } from "./dto/createTask.dto";
import { GetTasksFilterDTO } from "./dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
        const { status, searchTerm } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        if (searchTerm) {
            tasks = tasks.filter(
                (task) =>
                    task.title.includes(searchTerm) || task.description.includes(searchTerm),
            );
        }

        return tasks;
    }

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

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);

        task.status = status;

        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}
