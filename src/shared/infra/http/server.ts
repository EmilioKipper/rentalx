import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "@shared/infra/typeorm";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import swaggerConfig from "../../../swagger.json";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

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

app.listen(3333, () => console.log("Server is running"));
