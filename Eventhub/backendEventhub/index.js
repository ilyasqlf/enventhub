import 'dotenv/config';
import notificationRoutes from './Routes/notifications.js';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js';
import authRoute from './Routes/authRoutes.js';
import cron from 'node-cron';
import { sendRappelNotifications } from './cron/Notifications.js';


const app = express();
const PORT = process.env.PORT || 8888;

// 🔁 CRON pour notifications
cron.schedule('0 9 * * *', () => {
  console.log('🕘 Envoi des rappels...');
  sendRappelNotifications();
});

// 🔐 Sécurité + CORS
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(express.json());

// ✅ Routes
app.use('/', userRoutes);
app.use('/auth', authRoute);
app.use('/api/notifications', notificationRoutes);


// 🛠 Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur');
});

// 🚀 Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});