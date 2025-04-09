import {Router} from 'express'

import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../controllers/usuarios.controllers.js';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';
import { getAllPlayLists, getPlayList, createPlayList, deletePlayList, updatePlaylist } from '../controllers/playlists.controllers.js';
import { uploadFiles } from '../middlewares/uploadImgAudio.middlewares.js';
import { BACKEND_URL } from '../config/config.js';
import { getAllCanciones, getCancion, createCancion, deleteCancion,updateCancion } from '../controllers/canciones.controllers.js';
import { Cancion } from '../db/models/cancion.model.js';




const router = Router();




// ---------------------------------
//       Ruta UPLOADS
// ---------------------------------

router.post('/producto/uploads', uploadFiles.fields([
    {name: 'imgprod'},
    {name:'audio'}

]), async (req, res, next) => {

    try{


        if(!req.files || !req.files.imgprod || !req.files.audio){
            return res.status(400).json({
                success: false, 
                message: "No se ha proporcionado ninguna imagen"
            }) 
        }


        //Me falta aquí guardar req.file.filename en la base de datos 
    
        console.log(req.file);

        const imageUrl = `${BACKEND_URL}/uploads/${req.files.filename.imgprod[0].filename}`
        const audioUrl = `${BACKEND_URL}/uploads/audio${req.files.audio[0].filename}`

        //Creamos canción en la base de datos 
        const cancion = await Cancion.create({

            imagen: imageUrl,
            audio: audioUrl,
            nombre: req.body.nombre,
            artista: req.body.artista,  
            genero: req.body.genero,
            tag: req.body.tag,
            year: req.body.year

        })




        return res.status(200).json({
            success:"ok",
            message:"Imagen subida con éxito :)",
            fileData: req.file,
    
    



            data: cancion, 
             fileData: {  
                imageUrl: imageUrl,
                audioUrl: audioUrl
                //peso:`${Math.round(req.file.size/1024)}`,
                //size:"500kb"
            }
    
        })
    } catch(e) {

        next(e)



    }



})



// ---------------------------------
//       CRUD de usuarios 
// ---------------------------------

//obtener usuarios
router.get("/usuarios" , getAllUsuarios)

// //obtener un usuario 
router.get("/usuarios/:id" , getUsuario)

// //crear 
router.post("/usuarios" , createUsuario)

// //eliminar
router.delete("/usuarios/:id" , deleteUsuario )

//Actualizar
router.put("/usuarios/:id" , updateUsuario)


//login 
router.post("/usuarios/login" , loginUser)





// ---------------------------------
//       CRUD de playlists 
// ---------------------------------

//obtener playlists
router.get("/playlists" , getAllPlayLists)

// //obtener una playlist
router.get("/playlists/:id" , getPlayList)

// //crear 
router.post("/playlists" , createPlayList)

// //eliminar
router.delete("/playlists/:id" , deletePlayList )

//Actualizar
router.put("/playlists/:id" , updatePlaylist)




// ---------------------------------
//       CRUD de canciones 
// ---------------------------------


//obtener playlists
router.get("/playlists" , getAllCanciones)

// //obtener una playlist
router.get("/playlists/:id" , getCancion)

// //crear 
router.post("/playlists" , createCancion)

// //eliminar
router.delete("/playlists/:id" , deleteCancion )

//Actualizar
router.put("/playlists/:id" , updateCancion)





export default router