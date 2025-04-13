import {Router} from 'express'

import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario, getListsUser, createMyList } from '../controllers/usuarios.controllers.js';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';
import { getAllPlayLists, getPlayList,  createPlayList, deletePlayList, updatePlaylist } from '../controllers/playlists.controllers.js';
import { uploadFiles } from '../middlewares/uploadImgAudio.middlewares.js';
import { BACKEND_URL } from '../config/config.js';
import { getAllCanciones,getAllSongsPlayList, addSongToPlayList, getCancion, createCancion, deleteCancion,updateCancion } from '../controllers/canciones.controllers.js';
import { Cancion } from '../db/models/cancion.model.js';
import { AdminMiddleware, authMiddleWare } from '../middlewares/auth.middleware.js';



const router = Router();




// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------

router.post('/admin/uploads', AdminMiddleware, uploadFiles.fields([
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


     
    
        console.log(req.file);

        const imageUrl = `${BACKEND_URL}/uploads/${req.files.imgprod[0].filename}`
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
//       Ruta ADMIN
// ---------------------------------
router.get('/usuarios/admin', AdminMiddleware, (req, res) => {
    res.json({message:'Bienvenidx, admin :)'})
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


//registro
router.post("/usuarios/register" , registerUser)




//Obtener playlists de un usuario 
router.get("/me/playlists", authMiddleWare, getListsUser )


//El usuario crea una lista
router.post("/me/playlists", authMiddleWare, createMyList)








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
router.get("/canciones" , getAllCanciones)

// //obtener una playlist
router.get("/canciones/:id" , getCancion)

// //crear 
router.post("/canciones" , createCancion)

// //eliminar
router.delete("/canciones/:id" , deleteCancion )

//Actualizar
router.put("/canciones/:id" , updateCancion)



//Obtener canciones de una lista 
router.get('/playlists/:pid/canciones', getAllSongsPlayList)

//Añadir cancion a una lista
router.post("/playlists/:pid/canciones/:cid" ,addSongToPlayList ,)








export default router