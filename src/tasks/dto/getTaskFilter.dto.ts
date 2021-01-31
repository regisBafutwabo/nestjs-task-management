import { TaskStatus } from "../task.model";

export class GetTasksFilterDTO {
    status: TaskStatus;
    searchTerm: string;
}
