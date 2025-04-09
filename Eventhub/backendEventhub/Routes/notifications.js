import express from 'express';
import mysql from '../config/mysql.js'
import {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification
} from '../models/notificationModel.js';

const router = express.Router();

// GET 
router.get('/', (req, res) => {
  getAllNotifications((err, results) => {
    if (err) return res.status(500).json({ message: "Erreur SQL", err });
    res.json(results);
  });
});

// POST 
router.post('/', async (req, res) => {
    const { utilisateur_id, evenement_id, message, type, lu } = req.body;
    try {
      const connection = await mysql.getConnection();
      const sql = `
        INSERT INTO notifications (utilisateur_id, evenement_id, message, type, lu)
        VALUES (?, ?, ?, ?, ?)
      `;
      await connection.execute(sql, [utilisateur_id, evenement_id, message, type, lu]);
      connection.release();
      res.status(201).json({ message: 'Notification créée avec succès' });
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la création', erreur: err.message });
    }
  });
// PUT 
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedNotif = req.body;
  updateNotification(id, updatedNotif, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur SQL", err });
    res.json({ message: "Notification mise à jour" });
  });
});

// DELETE 
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteNotification(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur SQL", err });
    res.json({ message: "Notification supprimée" });
  });
});

export default router;
