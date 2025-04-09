import express from "express";
import mysql from "../config/mysql.js";

const router = express.Router();

// 🔍 GET : récupérer tous les utilisateurs
router.get("/utilisateurs", async (req, res) => {
  try {
    const connection = await mysql.getConnection();
    const [rows] = await connection.execute("SELECT * FROM utilisateurs");
    connection.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 POST : créer un nouvel utilisateur
router.post("/utilisateurs", async (req, res) => {
  const { First_Name, Last_Name, Email, password, pseudonyme } = req.body;

  try {
    const connection = await mysql.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO utilisateurs (First_Name, Last_Name, Email, password, pseudonyme) VALUES (?, ?, ?, ?, ?)",
      [First_Name, Last_Name, Email, password, pseudonyme]
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      First_Name,
      Last_Name,
      Email,
      password,
      pseudonyme,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ PUT : modifier un utilisateur par son id
router.put("/utilisateurs/:id", async (req, res) => {
  const { First_Name, Last_Name, Email, password, pseudonyme } = req.body;
  const { id } = req.params;

  try {
    const connection = await mysql.getConnection();
    await connection.execute(
      "UPDATE utilisateurs SET First_Name=?, Last_Name=?, Email=?, password=?, pseudonyme=? WHERE id=?",
      [First_Name, Last_Name, Email, password, pseudonyme, id]
    );
    connection.release();

    res.json({ id, First_Name, Last_Name, Email, password, pseudonyme });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE : supprimer un utilisateur par id
router.delete("/utilisateurs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.getConnection();
    await connection.execute("DELETE FROM utilisateurs WHERE id=?", [id]);
    connection.release();

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
