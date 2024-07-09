import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI:string = process.env.MONGO_URI ? String(process.env.MONGO_URI) : 'mongodb+srv://saintAdrian:Padrii2005!@cluster0.y4djtbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const PORT:number = process.env.SERVER_PORT ? Number( process.env.SERVER_PORT)  : 4000
const ROUNDS:number = process.env.SERVER_ROUNDS? Number( process.env.SERVER_ROUNDS) : 10

export const config =  {
    mongo:{
        url: MONGO_URI as string
    },
    server:{
        port: PORT,
        rounds: ROUNDS
    }
}