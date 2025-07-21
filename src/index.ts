import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('./heroes.db', (err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
    } else {
        db.run(
            `CREATE TABLE IF NOT EXISTS heroes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subtitle TEXT NOT NULL,
            buttonText TEXT NOT NULL,
            buttonColor TEXT NOT NULL,
            backgroundImage TEXT NOT NULL
            )`
        );

        db.run(
            `INSERT INTO heroes (title, subtitle, buttonText, buttonColor, backgroundImage)
             VALUES (?, ?, ?, ?, ?)`,
            [
            'Welcome to Our Site',
            'Discover amazing things with us.',
            'Get Started',
            'bg-blue-500',
            'https://via.placeholder.com/1920x600'
            ]
        );
    }
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript Express!' });
});
app.get('/heroes', (req: Request, res: Response) => {
    const db = new sqlite3.Database('./heroes.db');

    db.get('SELECT * FROM heroes LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(row);
    });
    return;
});

app.post('/heroes', (req: Request, res: Response) => {
    const { title, subtitle, buttonText, buttonColor, backgroundImage } = req.body;
    
    db.run(
        `UPDATE heroes SET title = ?, subtitle = ?, buttonText = ?, buttonColor = ?, backgroundImage = ? WHERE id = 1`,
        [title, subtitle, buttonText, buttonColor, backgroundImage],
        function (err) {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Hero updated successfully' });
        }
    );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});