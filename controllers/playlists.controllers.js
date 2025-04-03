

import { Playlist } from "../db/models/playlist.model.js";



const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}


//Obtener todas las playlists

export const getAllPlayLists = async (req, res, next) => {

    try {

        const playLists = await Playlist.find();
        responseAPI.data = playLists;
        responseAPI.msg = "Playlists encontradas con éxito"
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Tuvimos un error ", e)
        next(e)
    }
}



//Obtener una playlist

export const getPlayList = async (req, res, next) => {

    const { id } = req.params



    try {

        const playList = await Playlist.findById(id);
        responseAPI.data = playList;
        responseAPI.msg = `Playlist con id ${id} encontrada con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}


//Crear una playlist

export const createPlayList = async (req, res, next) => {


    const { nombre, userId, cancion  } = req.body;
    


    try {

        const nuevaPlayList = await Playlist.create({ name, email ,  username, password });
        responseAPI.data = nuevaPlayList;
        responseAPI.msg = ``
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

        const eliminado = await Alumno.findByIdAndDelete(id);
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
    const { nombre , email} = req.body



    try {

        const actualizado = await Alumno.findByIdAndUpdate(id, 
            { 
                nombre:nombre,
                 email: email 
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
