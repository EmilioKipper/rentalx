import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  iat: number;
  exp: number;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // Bearer hash
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (e) {
    throw new AppError("Invalid token", 401);
  }
}
