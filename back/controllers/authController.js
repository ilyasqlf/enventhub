import pool from "../config/mysql"; 
import bcrypt from "bcrypt"; //  hash le password
import jwt from "jsonwebtoken"; // info utilisateurs
import dotenv from "dotenv";  // cache certains info

dotenv.config();

//fonction pour l'inscription 

export const register = async (req, res) => {
    try {
        const { First_Name, Last_Name, pseudonyme, Email, Password } = req.body;

        if ( !First_Name || !Last_Name || !pseudonyme  || !Email || !Password) {
            return res.status(400).json({ message: "Tous les champs sont requis"});
        }

 // Vérifier si l'email est déjà utilise
   const [existingUser] = await pool.execute ("SELECT * FROM utilisateurs WHERE Email = ?", [Email]);   
   if (existingUser.length > 0) {
    return res.status(400).json({message: "l'email est déjà utilisé." });
   } 
   
   // Hash du mot de passe (cortar el password y al medio poner le poulet ou alors autre exemple, tu hash un fruit il ne reviendra jamais a son etat d'origine)

   const hashedPassword = await bcrypt.hash(Password,10);

   //Insérer l'utilisateur dans la base de données
   const [rows] = await pool.execute(
    "INSERT INTO utilisateurs (First_Name, Last_Name, pseudonyme, Email, Password) VALUES (?, ?, ?, ?, ?)", [First_Name, Last_Name, pseudonyme, Email, hashedPassword]
   );

   res.status(201).json({ message: "Utilisateur inscrit avec succés", utilisateurId: rows.insertId });
     } catch (error) {
        console.error("Erreur lors de l'inscription : ", error);
        res.status(500).json({ message: "Erreur serveur lors de l'inscription", error: error.message });
     }
};
// fonction pour la conexion

export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email et mot de passe sont requis" });

        }

     // vérifier si l'utilisateur existe
     const [rows] = await pool.execute("SELECT * FROM utilisateurs WHERE email = ?", [Email]);
     if (rows.length ===0) return res.status(401).json({ message: "Email ou mot passe incorrect" });
     // Vérifier le mot de passe 
     const isMatch = await bcrypt.compare(Password, rows[0].password);
     if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

     // Générer un token JWT
     const token = jwt.sign(
        { userId: rows [0].id, name: rows [0].name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
     );

     res.json({ message: "Connexion Réussie", token });
    } catch (error) {
        console.log("Erreur serveur : ", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message }); 
       }
};


export default {register,login};
