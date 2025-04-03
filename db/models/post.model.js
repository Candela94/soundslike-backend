import mongoose from "mongoose";


const options = {
    collection:'playlist',
    strict:true,

    collation: {
        locale:'es',
        strength:1
    }
}






const postSchema = new mongoose.Schema({


    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', 
        required: true,
      },


      songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancion', 
        required: true,
      },


})


export const Post = mongoose.Model('Post', postSchema)