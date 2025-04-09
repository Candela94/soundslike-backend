


import mongoose from 'mongoose'

const options = {
    collection: 'canciones',
    strict: true,

    collation: {
        locale:"es",
        strength: 1,
    }
}







const cancionSchema = new mongoose.Schema({


    nombre: String,
    
    artista: String,
    
    genero: String,
    
    tag: String,
    
    year: Number,
    
    imagen:String,
    
    audio:String,
    
    createdAt: {

        type: Date, 
        default: Date.now

    },


    playlist:[{type:mongoose.Schema.Types.ObjectId, ref:'Playlists'}],
    userId:[{type:mongoose.Schema.Types.ObjectId, ref: 'Usuario'}]


},options)


export const Cancion = mongoose.model('Cancion', cancionSchema)