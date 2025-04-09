import db from '../config/db.js';

export const createEvenement = (eventData, callback) => {
  const sql = `
    INSERT INTO evenements (nom, date, lieu, prix, Description, type_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    eventData.nom,
    eventData.date,
    eventData.lieu,
    eventData.prix ?? null,
    eventData.Description,
    eventData.type_id ?? null 
  ];

  db.query(sql, values, callback);
};