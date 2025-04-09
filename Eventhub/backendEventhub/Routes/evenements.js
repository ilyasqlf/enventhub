import express from "express";
import { createEvenement } from "../../../models/evenementModel.js";
import db from "../../../config/db.js";

const router = express.Router();

// Route POST pour créer un événement
router.post("/create", (req, res) => {
  const eventData = req.body;

  if (
    !eventData.nom ||
    !eventData.date ||
    !eventData.lieu ||
    !eventData.Description
  ) {
    return res.status(400).json({ message: "Champs requis manquants." });
  }

  createEvenement(eventData, (err, result) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la création de l'événement" });
    }

    res.status(201).json({
      message: "Événement créé avec succès !",
      evenement_id: result.insertId,
    });
  });
});

// ✅ Route GET pour afficher tous les événements avec leur type
router.get("/all", (req, res) => {
  const sql = `
    SELECT e.id, e.nom, e.date, e.lieu, e.prix, e.Description, t.nom AS type
    FROM evenements e
    LEFT JOIN type t ON e.type_id = t.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur MySQL :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.status(200).json(results);
  });
});

export default router;