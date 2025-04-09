import db from '../config/db.js';

export const enregistrerPaiement = (paiement, callback) => {
  const sql = `
    INSERT INTO paiements (utilisateur_id, evenement_id, montant, status, payment_provider_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    paiement.utilisateur_id,
    paiement.evenement_id,
    paiement.montant,
    paiement.status,
    paiement.payment_provider_id
  ];

  db.query(sql, values, callback);
};