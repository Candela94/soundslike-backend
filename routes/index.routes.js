import {Router} from 'express'

import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../controllers/usuarios.controllers.js';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';
import { getAllPlayLists, getPlayList, createPlayList, deletePlayList, updatePlaylist } from '../controllers/playlists.controllers.js';

const router = Router();


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








export default router