import { Router } from 'express'

import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario, getListsUser, createMyList } from '../controllers/usuarios.controllers.js';
import { loginUser, registerUser, createAdmin } from '../controllers/auth.controllers.js';
import { getAllPlayLists, createPlaylistByGenero, getPlayList, createPlayList, deletePlayList, updatePlaylist } from '../controllers/playlists.controllers.js';
import { uploadFiles } from '../middlewares/uploadImgAudio.middlewares.js';
import { BACKEND_URL } from '../config/config.js';
import { getAllCanciones, getAllSongsPlayList, addSongToPlayList, DeleteSongOfPlayList, getCancion, createCancion, deleteCancion, updateCancion } from '../controllers/canciones.controllers.js';
import { Cancion } from '../db/models/cancion.model.js';
import { AdminMiddleware, authMiddleWare } from '../middlewares/auth.middleware.js';
import { addToFavoritos, getAllFavoritos, removeFavorito } from '../controllers/favoritos.controllers.js';


const router = Router();




// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------

router.post('/admin/uploads', AdminMiddleware, uploadFiles.fields([
    { name: 'imgprod' },
    { name: 'audio' }

]), async (req, res, next) => {

    try {


        if (!req.files || !req.files.imgprod || !req.files.audio) {
            return res.status(400).json({
                success: false,
                message: "No se ha proporcionado ninguna imagen"
            })
        }




        console.log(req.files);

        const imageUrl = `${BACKEND_URL}/uploads/imagenes/${req.files.imgprod[0].filename}`
        const audioUrl = `${BACKEND_URL}/uploads/audio/${req.files.audio[0].filename}`

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
            success: "ok",
            message: "Imagen subida con éxito :)",
            data: cancion,
            fileData: {
                imageUrl: imageUrl,
                audioUrl: audioUrl
                //peso:`${Math.round(req.file.size/1024)}`,
                //size:"500kb"
            }

        })
    } catch (e) {

        next(e)



    }



})


router.post('/admin/uploads/playlists', AdminMiddleware,

    uploadFiles.single('coverImage'),

    async (req, res, next) => {


        try {

            const { nombre, genero} = req.body

            if (!nombre || !genero) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan datos'
                })
            }


            const coverImageUrl = `${BACKEND_URL}/uploads/imagenes/${req.file.filename}`


            const nuevaPlayList = await createPlaylistByGenero(
                {
                    nombre,
                    genero,
                    coverImage: coverImageUrl
                });

            return res.status(201).json({
                success: true,
                message: 'Lista creada con éxito',
                data: nuevaPlayList
            })



        } catch (e) {
            console.error(e);
            next(e)

        }

    })



// ---------------------------------
//       Ruta ADMIN
// ---------------------------------


router.get('/usuarios/admin', AdminMiddleware, (req, res) => {
    res.json({ message: 'Bienvenidx, admin :)' })
})

//Crear admin
router.post('/setup-admin', createAdmin)









// ---------------------------------
//       CRUD de usuarios 
// ---------------------------------

//obtener usuarios
router.get("/usuarios", getAllUsuarios)

//obtener un usuario 
router.get("/usuarios/:id", getUsuario)

//crear 
router.post("/usuarios", createUsuario)




//Eliminar
router.delete("/usuarios/:id", authMiddleWare, deleteUsuario)

//Actualizar
router.put("/usuarios/:id", updateUsuario)


//login 
router.post("/usuarios/login", loginUser)


//registro
router.post("/usuarios/register", registerUser)




//Obtener playlists de un usuario 
router.get("/me/playlists", authMiddleWare, getListsUser)


//El usuario crea una lista
router.post("/me/playlists", authMiddleWare, createMyList)




// ---------------------------------
//       CRUD de playlists 
// ---------------------------------

//obtener playlists
router.get("/playlists", getAllPlayLists)

// //obtener una playlist
router.get("/playlists/:id", getPlayList)

// //crear 
router.post("/playlists", createPlayList)

// //eliminar
router.delete("/playlists/:id", deletePlayList)

//Actualizar
router.put("/playlists/:id", updatePlaylist)



// //crear  playlist por
router.post("/playlists", createPlayList)


// ---------------------------------
//       CRUD de canciones 
// ---------------------------------


//obtener canciones
router.get("/canciones", getAllCanciones)

// //obtener una cancion
router.get("/canciones/:id", getCancion)

// //crear 
router.post("/canciones", createCancion)

// //eliminar
router.delete("/canciones/:id", deleteCancion)

//Actualizar
router.put("/canciones/:id", updateCancion)






//Obtener canciones favoritas 
router.get('/me/favoritos', authMiddleWare, getAllFavoritos)


//Añadir canciones a favoritos 
router.post('/me/favoritos', authMiddleWare, addToFavoritos)

//Eliminar de favoritos 
router.delete('/me/favoritos', authMiddleWare, removeFavorito)







//Obtener canciones de una lista 
router.get('/playlists/:pid/canciones', getAllSongsPlayList)

//Añadir cancion a una lista
router.post("/playlists/:pid/canciones/:cid", authMiddleWare, addSongToPlayList)


//Añadir cancion a una lista
router.delete("/playlists/:pid/canciones/:cid", authMiddleWare, DeleteSongOfPlayList)







export default router