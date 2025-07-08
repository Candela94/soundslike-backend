import { Cancion } from "../db/models/cancion.model.js";
import { createPlaylistByGenero } from "./playlists.controllers.js";
import { BACKEND_URL } from "../config/config.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.config.js";

// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------

export const uploadSong = async (req, res, next) => {
  try {
    // Check if files are provided
    if (!req.files || !req.files.imgprod || !req.files.audio) {
      return res.status(400).json({
        success: false,
        message: "Se requiere imagen y archivo de audio",
      });
    }

    // Upload image to Cloudinary
    const img = req.files.imgprod[0].path;
    let imgRes;
    try {
      imgRes = await cloudinary.uploader.upload(img, {
        folder: "imagenes_canciones",
        resource_type: "image",
      });
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      return res.status(500).json({
        success: false,
        message: "Error al subir la imagen a Cloudinary",
      });
    }

    // Upload audio to Cloudinary
    const audio = req.files.audio[0].path;
    let audioRes;
    try {
      audioRes = await cloudinary.uploader.upload(audio, {
        folder: "audio_canciones",
        resource_type: "video", // Cloudinary treats audio as video
      });
    } catch (error) {
      console.error("Error al subir el audio a Cloudinary:", error);
      return res.status(500).json({
        success: false,
        message: "Error al subir el audio a Cloudinary",
      });
    }

    // Delete local files after successful upload
    try {
      if (fs.existsSync(img)) fs.unlinkSync(img);
      if (fs.existsSync(audio)) fs.unlinkSync(audio);
    } catch (error) {
      console.error("Error al eliminar archivos locales:", error);
    }

    // Validate required fields
    const { nombre, artista, genero, tag, year } = req.body;
    if (!nombre || !artista || !genero || !tag || !year) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    // Create song in the database
    const cancion = await Cancion.create({
      imagen: imgRes.secure_url,
      audio: audioRes.secure_url,
      nombre,
      artista,
      genero,
      tag,
      year,
    });

    return res.status(200).json({
      success: true,
      message: "Canción subida con éxito",
      data: cancion,
      fileData: {
        imageUrl: imgRes.secure_url,
        audioUrl: audioRes.secure_url,
      },
    });
  } catch (e) {
    console.error("Error en uploadSong:", e);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al subir la canción",
    });
  }
};

export const uploadPlaylist = async (req, res, next) => {
  try {
    const { nombre, genero } = req.body;

    // Validate required fields
    if (!nombre || !genero) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos obligatorios",
      });
    }

    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Se requiere una imagen de portada",
      });
    }

    // Upload cover image to Cloudinary
    const portada = req.file.path;
    let portadaRes;
    try {
      portadaRes = await cloudinary.uploader.upload(portada, {
        folder: "portada_playlist",
      });
    } catch (error) {
      console.error("Error al subir la portada a Cloudinary:", error);
      return res.status(500).json({
        success: false,
        message: "Error al subir la portada a Cloudinary",
      });
    }

    // Delete local file after successful upload
    try {
      if (fs.existsSync(portada)) fs.unlinkSync(portada);
    } catch (error) {
      console.error("Error al eliminar archivo local de portada:", error);
    }

    // Create playlist in the database
    const nuevaPlayList = await createPlaylistByGenero({
      nombre,
      genero,
      coverImage: portadaRes.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Lista creada con éxito",
      data: nuevaPlayList,
    });
  } catch (e) {
    console.error("Error en uploadPlaylist:", e);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al crear la playlist",
    });
  }
};