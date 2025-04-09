import db from '../config/mysql.js'; // corrige selon ton fichier de connexion

export const getAllNotifications = (callback) => {
  db.query('SELECT * FROM notifications', callback);
};

export const createNotification = (notification, callback) => {
  const sql = 'INSERT INTO notifications (message, date, statut) VALUES (?, ?, ?)';
  const values = [notification.message, notification.date, notification.statut];
  db.query(sql, values, callback);
};

export const updateNotification = (id, notification, callback) => {
  const sql = 'UPDATE notifications SET message = ?, date = ?, statut = ? WHERE id = ?';
  const values = [notification.message, notification.date, notification.statut, id];
  db.query(sql, values, callback);
};

export const deleteNotification = (id, callback) => {
  db.query('DELETE FROM notifications WHERE id = ?', [id], callback);
};