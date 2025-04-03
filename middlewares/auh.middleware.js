import {JWT_SECRET} from '../config/config.js'
import jwt from 'jsonwebtoken'


export const authMiddleWare = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ','')

    if(!token){
        return res.status(401).json({message:'Acceso denegado, token requerido'})
    }


    try{

        //Verificamos token
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId;
        next();
    } catch(e) {

        res.status(401).json({message:'Acceso denegado, token expirado'})
    }


}