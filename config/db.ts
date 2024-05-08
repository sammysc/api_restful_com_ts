import mongoose from "mongoose";
import config from "config";    
import Logger from "./logger";

async function connect() {
    const dbUri = config.get<string>("dbUri"); //pegando a uri do banco de dados

    try{
        await mongoose.connect(dbUri); //conectando ao banco de dados
        Logger.info("Database connected");
    }catch(err){
        Logger.info(err);
        Logger.info("Database connection failed");
        process.exit(1); //encerrando o processo com erro
    }
}

export default connect;