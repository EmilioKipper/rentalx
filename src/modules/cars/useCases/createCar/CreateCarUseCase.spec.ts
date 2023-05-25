import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      name: "Name car",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car if license plate already taken by another car", () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "Brand",
        name: "Name car1",
        description: "Description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        category_id: "category",
      });

      await createCarUseCase.execute({
        brand: "Brand",
        name: "Name car2",
        description: "Description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      name: "Name car",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
