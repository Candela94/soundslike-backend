import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT || 3003;

export const DOMAIN = process.env.DOMAIN || "http://localhost"

export const BACKEND_URL = process.env.BACKEND_URL || "https://soundslike-backend-production.up.railway.app"



export const DB_USER =  process.env.DB_USER || "candelafsg"
export const DB_PASS =  process.env.DB_PASS || "Juanotee77"
export const CLUSTER =  process.env.DB_CLUSTER || "cei-practicas.k3hx5.mongodb.net"
export const DATABASE = process.env.DATABASE ||  "soundslike"

 export const JWT_SECRET = process.env.JWT_SECRET ||  "Et34WzL=fh5QoVw"




export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME 

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY


export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET 


export const CLOUDINARY_URL = process.env.CLOUDINARY_URL 


 export const DB_MONGODB = process.env.DB_MONGODB || "mongodb+srv://candelafsg:Juanotee77@cei-practicas.k3hx5.mongodb.net/soundslike?retryWrites=true&w=majority&appName=CEI-PRACTICAS"