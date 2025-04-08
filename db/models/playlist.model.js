import mongoose from "mongoose";


const options = {
    collection:'playlist',
    strict:true,

    collation: {
        locale:'es',
        strength:1
    }
}




const playListSchema = new mongoose.Schema({

    nombre: {
        
        type: String,
        required:true,


    },

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref:'Usuario'
    },


    cancion: {
        type: mongoose.Schema.Types.ObjectId, ref:'Cancion'
    },


    createdAt: {
        type: Date,
        default: Date.now
      },


      coverImage: {
        type: String,
        default: ''
      },
    



}, options)


export const Playlist = mongoose.model('Playlist', playListSchema)