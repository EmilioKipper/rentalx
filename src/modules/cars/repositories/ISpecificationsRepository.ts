import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpeficiationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create: ({
    description,
    name,
  }: ICreateSpeficiationDTO) => Promise<Specification>;
  findByName: (name: string) => Promise<Specification>;
  findByIds: (ids: string[]) => Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpeficiationDTO };
