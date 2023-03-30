import { Specification } from "../entities/Specification";

interface ICreateSpeficiationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create: ({ description, name }: ICreateSpeficiationDTO) => Promise<void>;
  findByName: (name: string) => Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpeficiationDTO };
