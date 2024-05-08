//create a router object and export it
import { create } from "domain";
import { Router, Request, Response } from "express";
import {
  createMovie,
  findMovieById,
  getAllMovies,
  removeMovie,
  updateMovie,
} from "./controllers/movieController";

// validate
import { validate } from "./middleware/handleValidation";
import { movieCreateValidation } from "./middleware/movieValidation";

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API OK");
  })
  .post("/movie", movieCreateValidation(), validate, createMovie)
  .get("/movie/:id", findMovieById)
  .get("/movie/", getAllMovies)
  .delete("/movie/:id", removeMovie)
  .patch(
    "/movie/:id",
    movieCreateValidation(),
    validate,
    createMovie,
    updateMovie
  ); //patch utilizado para atualizar um filme campo a campo. As validações devem ser feitas antes de chamar a função de atualização.
