

import { Cancion } from "../db/models/cancion.model.js";

import { createPlaylistByGenero } from "./playlists.controllers.js";
import { BACKEND_URL } from "../config/config.js";





// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------



export const uploadSong = async (req, res, next) => {

    try {


        if (!req.files || !req.files.imgprod || !req.files.audio) {
            return res.status(400).json({
                success: false,
                message: "Se requiere imagen, archivo o audio"
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

        await cancion.save();




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

        console.error('Error en uploadSong:', e);
        return res.status(500).json({
            error: 'Error interno del servidor al subir la canción'
        });
        



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
