import { model, Schema } from "mongoose"; //importando Model e Schema do mongoose

const movieSchema = new Schema(
  {
    //criando um novo Schema
    title: { type: String },
    rating: { type: Number },
    director: { type: String },
    stars: { type: Array },
    poster: { type: String },
   
  },
  {
    timestamps: true, //adicionando timestamps
  }
);
export const MovieModel = model("Movie", movieSchema); //exportando o modelo Movie
