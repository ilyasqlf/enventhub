import db from '../config/mysql.js'; // ✅ Assure-toi que le chemin est correct

export function sendRappelNotifications() {
  console.log(" Vérification des événements pour envoi de notifications...");

  const query = `
    SELECT * FROM evenements
    WHERE DATE(date) = CURDATE() + INTERVAL 1 DAY
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(" Erreur lors de la récupération des événements :", err);
    } else if (results.length === 0) {
      console.log(" Aucun événement pour demain.");
    } else {
      results.forEach(event => {
        console.log(` Rappel : L'événement "${event.nom}" a lieu demain à ${event.lieu}.`);
        // Ici tu pourrais envoyer un e-mail ou une notification en base si besoin
      });
    }
  });
}