import {IRentalsRepository} from "@modules/rentals/repositories/IRentalsRepository";
import {ICreateRentalDTO} from "@modules/rentals/dtos/ICreateRentalDTO";
import {Rental} from "@modules/rentals/infra/typeorm/entities/Rental";
import {getRepository, Repository} from "typeorm";


class RentalsRepository implements IRentalsRepository{

    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id, expected_return_date, user_id
        })

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });
        return openByUser;
    }

}

export { RentalsRepository }