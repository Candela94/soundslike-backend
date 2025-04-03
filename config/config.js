import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT || 3003;

export const DOMAIN = process.env.DOMAIN || "http://localhost"

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3003"



export const DB_USER =  process.env.DB_USER || "candelafsg"
export const DB_PASS =  process.env.DB_PASS || "Juanotee77"
export const CLUSTER =  process.env.DB_CLUSTER || "cei-practicas.k3hx5.mongodb.net"
export const DATABASE = process.env.DATABASE ||  "soundslike"

 export const JWT_SECRET = process.env.JWT_SECRET ||  "Et34WzL=fh5QoVw"