import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "@shared/container";
import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerConfig from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).send({ message: err.message });
    }

    return response.status(500).send({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
