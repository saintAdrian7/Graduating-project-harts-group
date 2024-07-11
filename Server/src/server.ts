import express, { Express, Response, Request,NextFunction } from "express";
import cors from 'cors'
import mongoose from "mongoose";
import { config } from "./config/Index";
import AuthRoutes from './Routes/Users'


const PORT = config.server.port
const app:Express = express()
app.use(express.json())
app.use(cors());


 (async function startup() {
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Connected to the database successfully");
        app.use('/users', AuthRoutes)
    } catch (error) {
        console.log("Could not make a connection to the database");
        console.error(error);
    }
})();

interface ErrorWithStatus extends Error {
    status?: number;
}
app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Something broke!');
});

app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
});




