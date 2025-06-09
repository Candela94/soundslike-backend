

import { Cancion } from "../db/models/cancion.model";

import { createPlaylistByGenero } from "./playlists.controllers";
import { BACKEND_URL } from "../config/config";





// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------



export const uploadSong = async (req, res, next) => {

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



}


  export  const uploadPlaylist =  async (req, res, next) => {


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

    }
