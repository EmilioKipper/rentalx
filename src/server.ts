import express from "express";
import swaggerUI from "swagger-ui-express";

import { router } from "./routes";
import swaggerConfig from "./swagger.json";

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.use(router);

app.listen(3333, () => console.log("Server is running"));
