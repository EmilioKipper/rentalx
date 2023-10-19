import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";

import { AppError } from "@shared/errors/AppError";

let rateLimiter: RateLimiterRedis | null = null;

const redisClient = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
});

redisClient.on("error", (error: any) => {
  console.warn("redis error", error);
});

rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10,
  duration: 5,
  execEvenly: false,
  blockDuration: 0,
  keyPrefix: "ensrl",
});

export async function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    await rateLimiter.consume(clientIP as string);

    return next();
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      throw new AppError("Too many requests", 429);
    } else {
      console.error("An unexpected error occurred:", error);

      return next(error);
    }
  }
}
