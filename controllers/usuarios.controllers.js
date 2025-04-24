

import { Usuario } from "../db/models/usuario.model.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'
import { Playlist } from "../db/models/playlist.model.js";




const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}


//Obtener todos los usuarios 

export const getAllUsuarios = async (req, res, next) => {

    try {

        const users = await Usuario.find();
        responseAPI.data = users;
        responseAPI.msg = "Usuarios encontrados con éxito"
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Tuvimos un error ", e)
        next(e)
    }
}



//Obtener un usuario

export const getUsuario = async (req, res, next) => {

    const { id } = req.params



    try {

        const user = await Usuario.findById(id);
        responseAPI.data = user;
        responseAPI.msg = `Usuario con id ${id} encontrado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}


//Crear un usuario

export const createUsuario = async (req, res, next) => {


    const { name, email, username, password, repeatPassword, role } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).json({
            message: 'Las contraseñas no coinciden'
        })
    }


    try {

        const nuevoUsuario = await Usuario.create({ name, email, username, password, role: role || 'user' });
        responseAPI.data = nuevoUsuario;
        responseAPI.msg = `Usuario con nombre ${name} y con email ${email} ha sido creado con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}





//Eliminar un usuario 

export const deleteUsuario = async (req, res, next) => {


    const { id } = req.params

    try {

        const eliminado = await Usuario.findByIdAndDelete(id);
        responseAPI.data = eliminado;
        responseAPI.msg = `Usuario con id ${id} eliminado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}



// Actualizar un usuario 
export const updateUsuario = async (req, res, next) => {
    const { id } = req.params
    const { nombre, email, role } = req.body



    try {

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado, token requerido' })
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId !== id && decoded.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para actualizar' })
        }

        const actualizado = await Usuario.findByIdAndUpdate(id,
            {
                nombre,
                email,
                role
            }, { new: true });

        responseAPI.data = actualizado;
        responseAPI.msg = `Usuario con id ${id} ha sido actualizado con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }
}









//Usuario crea una lista
export const createMyList = async (req, res, next) => {


    try{
        const userId = req.userId;
        const {nombre} = req.body;

        console.log("Creando playlist con datos:", { userId, nombre });

        if(!nombre) {
           return res.status(400).json({
                message: 'El nombre de la lista es obligatorio'
            })
        }


        const newPlayList = await Playlist.create({
            nombre,
            userId: userId
        })



        return res.status(201).json({
            message:'Lista creada con éxito',
            playlist: {
                id: newPlayList._id,
                nombre: newPlayList.nombre

            }
        })



    } catch (e){
        console.error("Error al crear la playlist: ", e )
        return res.status(500).json({message: 'Error al crear la playlist'})
       


    }
}



//Obtener playlists de un usuario 
export const getListsUser = async (req, res, next) => {
    
    try {
    const userId = req.userId;
    const results = await Playlist.find({ userId})

  
        return res.status(200).json({
            message: 'Playslists obtenidas correctamente',
            data:results
        })
    
    



    } catch (e) { 
        console.error('Error al obtener las playlists' , e)
        return res.status(500).json({message:'Hubo un problema'})
    }
}