import {Router} from 'express'

import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../controllers/usuarios.controllers.js';


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






export default router