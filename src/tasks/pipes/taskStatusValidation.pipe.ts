import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../taskStatus.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);

        return index !== -1;
    }
}
