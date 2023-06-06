import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => car.available);

    let filteredCars = carsAvailable;

    if (brand) {
      filteredCars = filteredCars.filter((car) => car.brand === brand);
    }

    if (category_id) {
      filteredCars = filteredCars.filter(
        (car) => car.category_id === category_id
      );
    }

    if (name) {
      filteredCars = filteredCars.filter((car) => car.name === name);
    }

    return filteredCars;
  }
}

export { CarsRepositoryInMemory };
