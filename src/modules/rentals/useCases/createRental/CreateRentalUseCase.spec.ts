import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const tomorrowDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "brand",
      daily_rate: 100,
      description: "descr",
      category_id: "123",
      fine_amount: 100,
      license_plate: "123",
      name: "test",
      id: "car_id_1",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: tomorrowDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if user has open rent", async () => {
    const sameUserId = "1234";

    await rentalsRepositoryInMemory.create({
      car_id: "car_id_456",
      expected_return_date: tomorrowDate,
      user_id: sameUserId,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: sameUserId,
        car_id: "another_car",
        expected_return_date: tomorrowDate,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this user!")
    );
  });

  it("should not be able to create a new rental if car is rented", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "brand",
      daily_rate: 100,
      description: "descr",
      category_id: "123",
      fine_amount: 100,
      license_plate: "123",
      name: "test",
      id: "car_id_1",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: tomorrowDate,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "54321",
        car_id: car.id,
        expected_return_date: tomorrowDate,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "brand",
      daily_rate: 100,
      description: "descr",
      category_id: "123",
      fine_amount: 100,
      license_plate: "123",
      name: "test",
      id: "car_id_1",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
