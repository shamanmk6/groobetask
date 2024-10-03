
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config({})

const url=process.env.MONGODB_URL;
const client=new MongoClient(url)
const dbname='users'

const connectMongoClient=async()=>{
    try {
        await client.connect()
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Error in connecting database");
        
    }
}
const getDb=()=>{
    return client.db(dbname);
}

export {connectMongoClient,getDb}