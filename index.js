

import express from 'express'
import { fileURLToPath } from 'url';


import {DOMAIN, PORT, BACKEND_URL} from './config/config.js'
import router from './routes/index.routes.js'
import { conectarDB } from './db/mongoose.js'

import cors from 'cors'



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())


//Contenido estático
app.use('/uploads', express.static('public/uploads'))
app.use('/web', express.static(path.join(__dirname, 'public/uploads')))




app.get("/", (req, res, next) => {
    res.send("Bienvenido a SOUNDsLike :)")
})


conectarDB();

app.use("/api/v1", router)


app.listen( PORT , () => {
    console.log(`Servidor funcionando en ${BACKEND_URL}`)
})