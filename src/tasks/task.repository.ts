import { Task } from "./task.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";
import { TaskStatus } from "./taskStatus.enum";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger("Tasks Repository");

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;
        const task = new Task();

        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.userId = user.id;

        try {
            await task.save();
            delete task.user;

            return task;
        } catch (error) {
            this.logger.error(
                `❌ User "${
                    user.username
                }" Failed to create a new task:"${JSON.stringify(
                    createTaskDTO,
                )}"`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }
    }

    async updateTask(
        task: Task,
        status: TaskStatus,
        user: User,
    ): Promise<Task> {
        task.status = status;

        try {
            await task.save();

            return task;
        } catch (error) {
            this.logger.error(
                `❌ User "${
                    user.username
                }" Failed to update status for task:"${JSON.stringify(task)}"`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }
    }

    async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const { status, searchTerm } = filterDto;

        const query = this.createQueryBuilder("task");

        query.where("task.userId = :userId", { userId: user.id });

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
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(
                `❌ Failed to get tasks for user "${
                    user.username
                }". Filters:${JSON.stringify(filterDto)}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }
    }
}
