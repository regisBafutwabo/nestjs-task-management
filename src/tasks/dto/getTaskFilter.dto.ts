import { IsOptional, IsIn } from "class-validator";
import { TaskStatus } from "../taskStatus.enum";
export class GetTasksFilterDTO {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    searchTerm: string;
}
