import express from "express";
import { enregistrerPaiement } from "../../../models/paiementModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { utilisateur_id, evenement_id, montant } = req.body;

    if (!utilisateur_id || !evenement_id || !montant) {
      console.log("❌ Champs manquants :", req.body);
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const paiement = {
      utilisateur_id,
      evenement_id,
      montant,
      status: "réussi",
      payment_provider_id: `fake_${Date.now()}`,
    };

    console.log("🧾 Paiement reçu :", paiement);

    enregistrerPaiement(paiement, (err, result) => {
      if (err) {
        console.error(
          "❌ ERREUR SQL PRÉCISE :",
          err.sqlMessage || err.message || err
        );
        return res
          .status(500)
          .json({ message: "Erreur SQL", erreur: err.sqlMessage });
      }

      res.status(201).json({
        message: "✅ Paiement enregistré avec succès !",
        paiement_id: result.insertId,
      });
    });
  } catch (err) {
    console.error("💥 ERREUR INATTENDUE :", err);
    res
      .status(500)
      .json({ message: "Erreur serveur inattendue", erreur: err.message });
  }
});
export default router;