import express from 'express';
import mysql from '../config/mysql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

router.post('/register', async (req, res) => {
  const { First_Name, Last_Name, Email, password, pseudonyme } = req.body;

  if (!First_Name || !Last_Name || !Email || !password || !pseudonyme) {
    return res.status(400).json({
      status: 'error',
      message: 'Tous les champs sont requis',
    });
  }

  try {
    const connection = await mysql.getConnection();

    const [existingUser] = await connection.execute(
      'SELECT * FROM utilisateurs WHERE Email = ?',
      [Email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({
        status: 'error',
        message: "L'utilisateur existe déjà",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
      'INSERT INTO utilisateurs (First_Name, Last_Name, Email, password, pseudonyme) VALUES (?, ?, ?, ?, ?)',
      [First_Name, Last_Name, Email, hashedPassword, pseudonyme]
    );

    connection.release();

    const newUser = { id: result.insertId, First_Name, Last_Name, Email };
    const token = jwt.sign({ id: newUser.id, Email: newUser.Email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { Email, password } = req.body;

  try {
    const connection = await mysql.getConnection();

    const [user] = await connection.execute(
      'SELECT * FROM utilisateurs WHERE Email = ?',
      [Email]
    );

    if (user.length === 0) {
      connection.release();
      return res.status(400).json({
        status: 'error',
        message: 'Utilisateur non trouvé',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      connection.release();
      return res.status(400).json({
        status: 'error',
        message: 'Mot de passe incorrect',
      });
    }

    connection.release();

    const token = jwt.sign({ id: user[0].id, Email: user[0].Email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', user: user[0], token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
