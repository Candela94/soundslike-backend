

import { Usuario } from "../db/models/usuario.model.js";



const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}


//Obtener todos los usuarios 

export const getAllUsuarios = async (req, res, next) => {

    try {

        const users = await Usuario.find();
        responseAPI.data = users;
        responseAPI.msg = "Usuarios encontrados con éxito"
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Tuvimos un error ", e)
        next(e)
    }
}



//Obtener un usuario

export const getUsuario = async (req, res, next) => {

    const { id } = req.params



    try {

        const user = await Usuario.findById(id);
        responseAPI.data = user;
        responseAPI.msg = `Usuario con id ${id} encontrado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}


//Crear un usuario

export const createUsuario = async (req, res, next) => {


    const { name, email, username, password  } = req.body;


    try {

        const nuevoUsuario = await Usuario.create({ name, email ,  username, password });
        responseAPI.data = nuevoUsuario;
        responseAPI.msg = `Usuario con nombre ${name} y con email ${email} ha sido creado con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}



//Eliminar un usuario 

export const deleteUsuario = async (req, res, next) => {


    const { id } = req.params

    try {

        const eliminado = await Alumno.findByIdAndDelete(id);
        responseAPI.data = eliminado;
        responseAPI.msg = `Usuario con id ${id} eliminado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}



// Actualizar un usuario 
export const updateUsuario = async (req, res, next) => {
    const { id } = req.params
    const { nombre , email} = req.body



    try {

        const actualizado = await Alumno.findByIdAndUpdate(id, 
            { 
                nombre:nombre,
                 email: email 
            }, { new: true });

        responseAPI.data = actualizado;
        responseAPI.msg = `Usuario con id ${id} ha sido actualizado con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }
}
