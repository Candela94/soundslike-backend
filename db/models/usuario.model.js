

import mongoose from "mongoose";


const options = {
    collection: 'usuarios',
    strict: true,

    collation: {
        locale: 'es',
        strength: 1
    }
}




const usuarioSchema = new mongoose.Schema({



    name: {

        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
        unique: true
    },


    password: {
        type: String,
        required: true,

    },


    username: {

        type: String,
        required: true,
        unique: true

    },


    playlists: [{
        type:mongoose.Schema.Types.ObjectId, ref: 'Playlist'
    }],


    canciones: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Cancion'
    },


    favoritos: [{
        type:mongoose.Schema.Types.ObjectId, ref: 'Cancion',
        default: []
    }],

    createdAt: {
 
        type: Date,
        default: Date.now

    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }



}, options)



export const Usuario = mongoose.model("Usuario", usuarioSchema)