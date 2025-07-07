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
import { uploadPlaylist, uploadSong } from '../controllers/uploads.controllers.js';




const router = Router();







// ---------------------------------
//       Ruta ADMIN
// ---------------------------------


router.get('/usuarios/admin', AdminMiddleware, (req, res) => {
    res.json({ message: 'Bienvenidx, admin :)' })
})

//Crear admin
router.post('/setup-admin', createAdmin)





// ---------------------------------
//       Ruta uploads admin
// ---------------------------------




//Carga de canciones

router.post('/admin/uploads', 
    AdminMiddleware, 
    uploadFiles.fields([
        { name: 'imgprod' },
        { name: 'audio' }
    ]), 
    uploadSong
);



//Carga de playlists

router.post('/admin/uploads/playlists', 
    AdminMiddleware,
    uploadFiles.single('coverImage'),
    uploadPlaylist
);






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