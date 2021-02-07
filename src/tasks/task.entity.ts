import { User } from "src/auth/user.entity";
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { TaskStatus } from "./taskStatus.enum";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
    user: User;
}
