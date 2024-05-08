// Code to log http requests using morgan
import morgan, { StreamOptions } from "morgan"; // Import morgan
import config from "config"; // Import config
import Logger from "../../config/logger"; // Import logger


const stream: StreamOptions = {
    write: (message) => Logger.http(message), // Use the logger to log http requests
};

const skip = () => {
    const env = config.get<string>("env") || "development"; // Get the environment
    return env !== "development"; // Skip logging if not in development
};
const morganMiddleware = morgan( // Create the morgan middleware
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip } // Use the stream and skip functions
);  

export default morganMiddleware; 
