import {ICarsImagesRepository} from "@modules/cars/repositories/ICarsImagesRepository";
import {CarImage} from "@modules/cars/infra/typeorm/entities/CarImage";
import {getRepository, Repository} from "typeorm";


class CarsImageRepository implements ICarsImagesRepository{

    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {

        const carImage = this.repository.create({
            car_id,
            image_name
        });

        await this.repository.save(carImage);

        return carImage;

    }



}

export { CarsImageRepository};