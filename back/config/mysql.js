import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "eventhub",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}); 
// vérifie la connexion

pool 
    .getConnection()
    .then((conn) => {
    console.log("Connexion MySQL réussie !");
    conn.release();
})
    .catch((err) => {
        console.error(" Erreur de connexion MySQL :", err);
    })

    export default pool; 