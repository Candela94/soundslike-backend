

import { Cancion } from "../db/models/cancion.model.js";
import { Usuario } from "../db/models/usuario.model.js";




export const getAllFavoritos = async (req, res) => {


    try {
        const user = await Usuario.findById(req.userId).populate('favoritos');
        if(!user) {
            return res.status(404).json({message:'Usuario no encontrado'})
        }

        res.json(user.favoritos)



    } catch(e) {



        console.error("Error al obtener favoritos", e);
        res.status(500).json({ message: "Error al obtener favoritos" });
    }

}





//Añadir a favoritos 
export const addToFavoritos = async (req, res) => {

 
    const {songId} = req.body;

    if(!songId) return res.status(404).json({message: 'Canción no encontrada'})


try{
    
    const user = await Usuario.findById(req.userId)
   
    if(!user) return res.status(404).json({message:'Usuario no encontrado'})
    
    const song = await Cancion.findById(songId)
    if(!song) return res.status(404).json({message:'Canción no encontrada'})
        if(!user.favoritos.includes(songId)) {
            user.favoritos.push(songId)
            await user.save()
        }



    res.status(200).json({message: 'Canción añadida a favoritos', favoritos: user.favoritos})



} catch (e) {

    console.error('Hubo un error', e);
    res.status(500).json({message:'Error al añadir a favoritos'})
}


}



//Eliminar de favoritos 
export const removeFavorito = async (req, res) => {

    const { songId } = req.body
    if (!songId) return res.status(400).json({ message: 'Falta id de la canción' });


    try{

        const user = await Usuario.findById(req.userId)

        if(!user) return res.status(404).json({message:'Usuario no encontrado'})
            

            user.favoritos = user.favoritos.filter((id) => id.toString() !== songId)
            await user.save()
            res.status(200).json({message:'Canción eliminada de favoritos'})


    } catch(e) {

        console.error('Error al eliminar de favoritos', e);
        res.status(500).json({ message: 'Error al eliminar de favoritos' });
    }



}