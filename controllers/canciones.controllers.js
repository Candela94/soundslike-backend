

import mongoose from "mongoose";
import { Cancion } from "../db/models/cancion.model.js";
import { Playlist } from "../db/models/playlist.model.js";




const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}



//Obtener canciones
export const getAllCanciones = async (req, res, next) => {


    try {

        const canciones = await Cancion.find();
        responseAPI.data = canciones;
        responseAPI.msg = "Canciones encontradas con éxito"
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Tuvimos un error ", e)
        next(e)
    }

}


//Obtener una cancion

export const getCancion = async (req, res, next) => {

    const { id } = req.params



    try {

        const cancion = await Cancion.findById(id);
        responseAPI.data = cancion;
        responseAPI.msg = `Canción con id ${id} encontrada con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }


}



//Crear una canción 

export const createCancion = async (req, res, next) => {


    const { nombre, artista, genero  } = req.body;


    try {

        const nuevaCancion = await Cancion.create({ nombre, artista, genero });

        responseAPI.data = nuevaCancion;
        responseAPI.msg = `Canción con nombre ${nombre} de ${artista} ha sido creado con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}



//Eliminar una canción

export const deleteCancion = async (req, res, next) => {


    const { id } = req.params

    try {

        const eliminada = await Cancion.findByIdAndDelete(id);
        responseAPI.data = eliminada;
        responseAPI.msg = `Canción con id ${id} eliminada con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}





// Actualizar una cancion
export const updateCancion = async (req, res, next) => {
    const { id } = req.params
    const { nombre } = req.body



    try {

        const actualizada = await Cancion.findByIdAndUpdate(id, 
            { 
                nombre:nombre,
               
            }, { new: true });

        responseAPI.data = actualizada;
        responseAPI.msg = `Cancion con id ${id} ha sido actualizada con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }
}








//Obtener canciones de una lista
export const getAllSongsPlayList = async(req,res,next) => {

    const {pid} = req.params
    console.log('pid es' , pid)

    try {


        const playlist = await Playlist.findById(pid).select('nombre cancion coverImage').populate('cancion');
        if(!playlist) {
            return res.status(404).json({message:'playlist no encontrada'})
        }
        

       
        console.log('IDs de canciones en la playlist:', playlist.cancion);
        res.status(200).json(
            {
                nombre:playlist.nombre,
                coverImage:playlist.coverImage,
                canciones: playlist.cancion
            }
        );


    } catch(e) {

        console.error('Error al obtener canciones' , e)
        res.status(500).json({message:'Error al obtener canciones de la playlist'})
        

    }
}




//Añadir una canción a una lista 
export const addSongToPlayList = async (req,res,next) => {

    const {pid,cid} = req.params
    const userId = req.userId;


    try{

        const playlist = await Playlist.findById(pid);

        if(!playlist) { 
            
            console.log(`Playlist ${pid} no encontrada`);
            return res.status(404).json({message: 'Playlist no encontrada'})
        
        }


        if (playlist.userId.toString() !== userId) {
            console.log(`El usuario ${userId} no tiene permisos para modificar la playlist ${pid}`);
            return res.status(403).json({message: 'No tienes permiso para modificar esta playlist'});
        }



        const cancion = await Cancion.findById(cid);
        if (!cancion) {
            console.log(`Canción ${cid} no encontrada`);
            return res.status(404).json({message: 'Canción no encontrada'});
        }

        



        // playlist.cancion.push(cid);
        // await playlist.save();

     


      const result = await Playlist.updateOne(
            { _id: pid, userId: userId },
            { $addToSet: { cancion: cid } }
        );
        
        if (result.modifiedCount === 0 && result.matchedCount === 0) {
            return res.status(404).json({message: 'Playlist no encontrada o sin permisos'});
        }
        
        // También actualizar la canción
        await Cancion.updateOne(
            { _id: cid },
            { $addToSet: { playlist: pid } }
        );
        res.status(200).json({ message: 'Canción añadida a la playlist con éxito', status:'ok' ,data:playlist});


    } catch(e) {

        console.error("El error es" , e)
       
        res.status(500).json({ 
            message: 'Error al añadir canción a la playlist', 
            error: e.message 
        });


    }
}




//Eliminar una cancion de una playlist

export const DeleteSongOfPlayList = async (req,res,next) => {

    const {pid,cid} = req.params
    const userId = req.userId;


    try{

        const playlist = await Playlist.findById(pid);

        if(!playlist) { 
            
            console.log(`Playlist ${pid} no encontrada`);
            return res.status(404).json({message: 'Playlist no encontrada'})
        
        }


        if (playlist.userId.toString() !== userId) {
            console.log(`El usuario ${userId} no tiene permisos para modificar la playlist ${pid}`);
            return res.status(403).json({message: 'No tienes permiso para modificar esta playlist'});
        }


        const cancion = await Cancion.findById(cid)

        if (!cancion) {
            console.log(`Canción ${cid} no encontrada`);
            return res.status(404).json({message: 'Canción no encontrada'});
        }

       
        if(playlist) {
            playlist.cancion.pull(cid);
            await playlist.save();
        }

       
        res.status(200).json({
            message: 'Canción eliminada correctamente de la playlist',
            status: 'ok',
            data: playlist
        });

    } catch(e) {

        console.error("El error es" , e)
       
        res.status(500).json({ 
            message: 'Error al añadir canción a la playlist', 
            error: e.message 
        });


    }
}

