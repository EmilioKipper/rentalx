import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "category_id",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABCD-123",
      name: "Car 1",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const carName = "Car 2";

    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: "category_id",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABCD-123",
      name: carName,
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: carName,
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const carBrand = "Car brand test";

    const car = await carsRepositoryInMemory.create({
      brand: carBrand,
      category_id: "category_id",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABCD-123",
      name: "Car 3",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: carBrand,
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category id", async () => {
    const categoryId = "category_id_test";

    const car = await carsRepositoryInMemory.create({
      brand: "Car brand",
      category_id: categoryId,
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABCD-123",
      name: "Car 3",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: categoryId,
    });

    expect(cars).toEqual([car]);
  });
});
