import express from 'express';
import Database from 'better-sqlite3';

const db = new Database('database.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
    )
    `);

    const app = express();
    app.use(express.json());

    app.get('/api/products', (req, res) => {
        const products = db.prepare('SELECT * FROM products').all()
    res.json(products);
    });

    app.post('/api/products', (req, res) => {
        const { name, price } = req.body;
        const result = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)').run(name, price);
        res.status(201).json({ id: result.lastInsertRowid, name, price });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`servern körs på http://localhost:${3000}`);
    });