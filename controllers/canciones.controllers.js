

import { Cancion } from "../db/models/cancion.model.js";



const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}



//Obtener canciones
export const getAllCanciones = async () => {


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

export const getCancion = async () => {

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






