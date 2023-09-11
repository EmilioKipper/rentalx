import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string) {
    const { email, sub: user_id } = verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    ) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        subject: user_id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.userTokensRepository.create({
      expires_date,
      refresh_token: new_refresh_token,
      user_id,
    });

    return new_refresh_token;
  }
}

export { RefreshTokenUseCase };
