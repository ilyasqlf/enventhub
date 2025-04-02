import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js';
import authRoute from './Routes/authRoutes.js'; // Importer le fichier authRoute.js


const app = express();
const PORT = process.env.PORT || 8888;

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // Autoriser les requêtes depuis localhost:3000
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.use('/', userRoutes);
app.use('/auth', authRoute); // Utiliser les routes d'authentification

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur');
});

app.listen(PORT, () => 
  {console.log(`Server is running on port ${PORT}`);});