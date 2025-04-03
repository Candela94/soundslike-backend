import mongoose, { mongo } from "mongoose";


const options = {
    collection:'playlist',
    strict:true,

    collation: {
        locale:'es',
        strength:1
    }
}


const addedSongSchema  = new mongoose.Schema({

    playListId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'
    },
    cancionId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Cancion'
    },
    addedAt: {
        type: Date,
        default: Date.now, 
      },

})


export const AddedSong = mongoose.model('AddedSong', addedSongSchema)