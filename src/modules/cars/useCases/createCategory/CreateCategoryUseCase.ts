import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {ICategoriesRepository} from "../../repositories/ICategoriesRepository";
import {AppError} from "@shared/erros/AppError";

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}
    async execute({description, name}: IRequest): Promise<void>{

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists){
            throw new AppError("Category already exists!");
        }

        await this.categoriesRepository.create({name, description});
    }
}

export { CreateCategoryUseCase }