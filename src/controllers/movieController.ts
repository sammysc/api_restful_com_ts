//controller for movie
import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data); //create utilizado para criar um novo filme
    return res.status(201).json(movie);
  } catch (e: any) {
    Logger.error(`Erro ao criar dados:${e.message}`);
    return res.status(500).json({ error: "Ocorreu um erro interno, por favor tente mais tarde." }); //exibindo um erro genérico para o usuário
  }
}
export async function findMovieById(req: Request, res: Response) {
  try {
    const id = req.params.id;           
    const movie = await MovieModel.findById(id); //findById utilizado para buscar um filme pelo ID
    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }
    return res.status(200).json(movie);
  } catch (e: any) {
    Logger.error(`Erro ao buscar dados: ${e.message}`);
    return res.status(500).json({ error: "Ocorreu um erro interno, por favor tente mais tarde." }); //exibindo um erro genérico para o usuário
  }
}
export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await MovieModel.find();  //find utilizado para buscar todos os filmes
        return res.status(200).json(movies);
    } catch (e: any) {
        Logger.error(`Erro ao buscar dados: ${e.message}`);
        return res.status(500).json({ error: "Ocorreu um erro interno, por favor tente mais tarde." }); //exibindo um erro genérico para o usuário
    }
    }
export async function removeMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id);   //findById utilizado para deletar um filme
        if (!movie) {
            return res.status(404).json({ error: "Filme não encontrado." });
        }
        await movie.deleteOne(); // Use the remove() method instead of delete()
        return res.status(200).json({ message: "Filme removido com sucesso."});
        
    } catch (e: any) {
        Logger.error(`Erro ao deletar dados: ${e.message}`);
        return res.status(500).json({ error: "Ocorreu um erro interno, por favor tente mais tarde." }); //exibindo um erro genérico para o usuário
    }
}
 export async function updateMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const movie = await MovieModel.findById(id);   //findById utilizado para atualizar um filme
        if (!movie) {
            return res.status(404).json({ error: "Filme não encontrado." });
        }
        await MovieModel.updateOne({_id: id}, data);
        return res.status(200).json({data}); //retornando os dados atualizados
        
    } catch (e: any) {
        Logger.error(`Erro ao atualizar dados: ${e.message}`);
        return res.status(500).json({ error: "Ocorreu um erro interno, por favor tente mais tarde." }); //exibindo um erro genérico para o usuário
    }
}   
