import express from 'express';
import mysql from '../config/mysql.js';

const router = express.Router();

//utilisateurs:
router.get('/utilisateurs', async (req, res) => {
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM utilisateurs');
        connection.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.messpseudonyme });
    }
});

router.post('/utilisateurs', async (req, res) => {
    const {First_Name, Last_Name, Email, password, pseudonyme} = req.body;
    try{
        const connection = await mysql.getConnection();
        const [result] = await connection.execute('INSERT INTO utilisateurs (First_Name, Last_Name, Email, password, pseudonyme) VALUES (?,?,?,?,?)', [First_Name, Last_Name, Email, password, pseudonyme]);
        connection.release();

        res.status(201).json({ id: result.insertId, First_Name, Last_Name, Email, password, pseudonyme });
    } catch (err) {
        res.status(500).json({ error: err.messpseudonyme });
    }
});

router.put('/utilisateurs/:id', async (req, res) => {
    const {First_Name, Last_Name, Email, password} = req.body;
    const {id} = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('UPDATE user SET First_Name=?, Last_Name=?, Email=?, password=?, pseudonyme=? WHERE id=?', [First_Name, Last_Name, Email, password, pseudonyme, id]);
        connection.release();
        res.json({ id, First_Name, Last_Name, Email, password, pseudonyme });
    } catch (err) {
        res.status(500).json({ error: err.messpseudonyme });
    }
});

router.delete('/utilisateurs/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM utilisateurs WHERE id=?', [id]);
        connection.release();
        res.json({ messpseudonyme: 'User supprimé de la base de données' });
    } catch (err) {
        res.status(500).json({ error: err.messpseudonyme });
    }
});



export default router;
