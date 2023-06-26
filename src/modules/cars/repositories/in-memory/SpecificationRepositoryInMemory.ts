import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpeficiationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpeficiationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { description, name });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((spec) =>
      ids.includes(spec.id)
    );

    return allSpecifications;
  }
}

export { SpecificationRepositoryInMemory };
