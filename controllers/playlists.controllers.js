

import { Playlist } from "../db/models/playlist.model.js";
import { Cancion } from "../db/models/cancion.model.js";



const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}


//Obtener todas las playlists

export const getAllPlayLists = async (req, res, next) => {

    try {
        const { isAdmin } = req.query

        let query = {};

        if (isAdmin === 'true') {

            query.isAdmin = true;

        } else if (isAdmin === 'false') {
            query.isAdmin = { $ne: true }
        }


        const playLists = await Playlist.find(query);
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

        const playList = await Playlist.findById(id).select('nombre artista genero imagen audio').populate('cancion')




        res.status(200).json({
            status: 'ok',
            msg: `Playlist con id ${id} encontrada con éxito`,
            data: {
                nombre: playList.nombre,
                canciones: playList.cancion ,
                coverImage: playList.coverImage
            }

        })


        if (!playList) {
            return res.status(404).json({
                status: 'error',
                msg: `Playlist con id ${id} no encontrada`
            });
        }

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}



//Crear una playlist
export const createPlayList = async (req, res, next) => {


    const { nombre } = req.body;



    try {

        const nuevaPlayList = await Playlist.create({ nombre });
        console.log(nuevaPlayList)
        responseAPI.data = nuevaPlayList;
        responseAPI.msg = ``
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}






//crear una playlist por género (ADMIN)
export const createPlaylistByGenero = async ({ nombre, genero, coverImage }) => {
    const canciones = await Cancion.find({ genero });

    const nuevaPlayList = await Playlist.create({
        nombre,
        cancion: canciones.map(c => c._id),
        coverImage,
        isAdmin: true
    })

    return nuevaPlayList;
}








//Eliminar una playlist 

export const deletePlayList = async (req, res, next) => {


    const { id } = req.params

    try {

        const eliminada = await Playlist.findByIdAndDelete(id);
        responseAPI.data = eliminada;
        responseAPI.msg = `Playlist con id ${id} eliminado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}



// Actualizar una playlist
export const updatePlaylist = async (req, res, next) => {
    const { id } = req.params
    const { nombre } = req.body



    try {

        const actualizado = await Playlist.findByIdAndUpdate(id,
            {
                nombre: nombre,

            }, { new: true });

        responseAPI.data = actualizado;
        responseAPI.msg = `Playlist con id ${id} ha sido actualizada con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }
}
