import dayjs from "dayjs";

import {CreateRentalUseCase} from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import {RentalsRepositoryInMemory} from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import {AppError} from "@shared/erros/AppError";
import {DayjsDateProvider} from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Horas = dayjs().add(1,"day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayjsDateProvider);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Horas
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })

    it("should not be able to create a new rental if there is another open to the same user",  () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Horas
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Horas
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able to create a new rental if there is another open to the same car",  () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Horas
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Horas
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able to create a new rental with invalid return time",  () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate()
            });


        }).rejects.toBeInstanceOf(AppError);

    });

});