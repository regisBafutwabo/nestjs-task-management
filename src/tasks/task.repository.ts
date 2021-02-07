import { Task } from "./task.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";
import { TaskStatus } from "./taskStatus.enum";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;
        const task = new Task();

        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.user = user;

        task.save();
        delete task.user;

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
            query.andWhere(
                "(task.title LIKE :search OR task.description LIKE :search)",
                {
                    search: `%${searchTerm}%`,
                },
            );
        }

        const tasks = await query.getMany();

        return tasks;
    }
}
