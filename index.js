

import express from 'express'


import {DOMAIN, PORT, BACKEND_URL} from './config/config.js'
import router from './routes/index.routes.js'
import { conectarDB } from './db/mongoose.js'

import cors from 'cors'



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors())



//Contenido estático
app.use('/uploads', express.static('public/uploads'))
app.use('/web', express.static('public'))

// app.get("/", (req,res,next) => {
//     res.setHeader("Content-Type", "text/html")

//     const pageHTML = `
    
//     <h1> Bienvenidx a SOUNDsLIKE :) </h1>
    

    
//     `

//     res.send(pageHTML)
// })






app.get("/", (req, res, next) => {
    res.send("Bienvenido a SOUNDsLike :)")
})


conectarDB();

app.use("/api/v1", router)


app.listen( PORT , () => {
    console.log(`Servidor funcionando en ${BACKEND_URL}`)
})