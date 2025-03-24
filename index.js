

import express from 'express'
import mongoose from 'mongoose'

import {DOMAIN, PORT} from './config/config.js'
import router from './routes/index.routes.js'
import { conectarDB } from './db/mongoose.js'
import dotenv from 'dotenv'
import cors from 'cors'



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET', 'POST'],
    allowedHeaders:['Content-Type']
}))



app.get("/", (req, res, next) => {
    res.send("Bienvenido a SOUNDsLike :)")
})


conectarDB();

app.use("/api/v1", router)


app.listen( PORT , () => {
    console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
})