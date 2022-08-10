import {IUsersRepository} from "../IUsersRepository";
import {User} from "../../infra/typeorm/entities/User";
import {ICreateUserDTO} from "../../dtos/ICreateUserDTO";

class UserRepositoryInMemory implements IUsersRepository{

    users: User[] = [];

    async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            driver_license, email, name, password
        });

        this.users.push(user, user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }



}

export { UserRepositoryInMemory }