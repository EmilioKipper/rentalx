import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUSerTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.userTokens.push(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokensWithoutRemoved = this.userTokens.filter(
      (userToken) => userToken.id !== id
    );

    this.userTokens = userTokensWithoutRemoved;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id
    );

    return userToken;
  }
}

export { UserTokensRepositoryInMemory };
