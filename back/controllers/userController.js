import pool from "@config/mysql.js";

export const getAllUtilisateurs = async (req, res) =>{
    try {
         const [rows] = await pool .query("SELECT * FROM utilisateurs");
         res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
export const registerUtilisateur = async (req, res) => {
    try {
      const { First_Name, Last_Name, pseudonyme, Password } = req.body;
      if (!First_Name || !Last_Name || !pseudonyme || !Password) {
        return res.status(400).json({ message: "Tous les champs sont requis"});
      }
      const [result] = await pool.query("INSERT INTO utilisateurs ( First_Name, Last_Name, pseudonyme, Password) VALUES (?, ?, ?, ?)",[First_Name, Last_Name, pseudonyme, Password]);

      export const registerUtilisateur = async (req,res) => {
        const { First_Name, Last_Name, pseudonyme, Password } = req.body;
        if (!First_Name || !Last_Name || !pseudonyme || !Password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });

        };
        const [result] = await pool.query ("INSERT INTO utilisateurs (First_Name, Last_Name, pseudonyme, Password) VALUES (?, ?, ?, ?)", [First_Name, Last_Name, pseudonyme, Password]);
    
        res.status(201).json ({ message: "Utilisateur enregistré avec succes ", id: result.insertId });
        }  catch (error) {
            res.status(500).json({ message: "Erreur lors de l'inscription", error });
        
    }


};



export default getAllUtilisateurs;
