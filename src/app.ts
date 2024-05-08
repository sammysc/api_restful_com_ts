// ENV variables
require("dotenv").config(); //importando o dotenv

import express from "express";
import config from "config";

const app = express(); //iniciando o express

//json middleware
app.use(express.json());

import db from "../config/db"; //importando o DB

//importando o router
import router from "./router";

//importando o logger
import Logger from "../config/logger";  

//importando o morgan
import morganMiddleware from "./middleware/morganMiddleware";

app.use(morganMiddleware); //usando o morgan

app.use("/api/", router); //usando o router


//app port
const port = config.get<number>("port");

app.listen(port, async () => {
  //iniciando o servidor
  await db(); //conectando ao banco de dados

  Logger.info(`Server running on port ${port}`); //usando o logger
});
