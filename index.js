

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

app.get("/", (req,res,next) => {
    res.setHeader("Content-Type", "text/html")

    const pageHTML = `
    
    <h1> Upload de archivos </h1>
     <form action ="/api/v1/producto/uploads" method="POST" enctype="multipart/form-data">
     <input type = "text" name = "nombre" placeholder = "Canción"/> 
     <input type = "text" name = "artista" placeholder = "Artista"/> 
     <input type = "text" name = "genero" placeholder = "Género"/>
     <input type = "text" name = "tag" placeholder = "Tag"/>

     <input type = "file" name = "imgprod" />
      <input type = "file" name = "audio" />

     <button type="submit"> Subir canción </button>
     </form>
    `

    res.send(pageHTML)
})






app.get("/", (req, res, next) => {
    res.send("Bienvenido a SOUNDsLike :)")
})


conectarDB();

app.use("/api/v1", router)


app.listen( PORT , () => {
    console.log(`Servidor funcionando en ${BACKEND_URL}`)
})