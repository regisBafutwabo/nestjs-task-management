import { Task } from "./task.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";
import { TaskStatus } from "./taskStatus.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO;

        const task = new Task();

        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;

        task.save();

        return task;
    }

    async updateTask(task: Task, status: TaskStatus): Promise<Task> {
        task.status = status;

        await task.save();

        return task;
    }

    async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
        const { status, searchTerm } = filterDto;

        const query = this.createQueryBuilder("task");

        if (status) {
            query.andWhere("task.status = :status", { status });
        }
        if (searchTerm) {
            query.andWhere("(task.title LIKE :search OR task.description LIKE :search)", {
                search: `%${searchTerm}%`,
            });
        }

        const tasks = await query.getMany();

        return tasks;
    }
}
