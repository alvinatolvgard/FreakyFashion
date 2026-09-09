import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const db = new Database('database.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    imageUrl TEXT,
    details TEXT,
    sku TEXT NOT NULL UNIQUE,
    publishedDate TEXT
    )
    `);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    const search = req.query.search as string | undefined;

    if (search) {
        const products = db.prepare('SELECT * FROM products WHERE name LIKE ?').all(`%${search}%`);
        res.json(products);
    } else {
        const products = db.prepare('SELECT * FROM products').all()
        res.json(products);
    }
});

app.post('/api/products', (req, res) => {
    const { name, price, imageUrl, details, sku, publishedDate } = req.body;
    const result = db.prepare('INSERT INTO products (name, price, imageUrl, details, sku, publishedDate) VALUES (?, ?, ?, ?, ?, ?)').run(name, price, imageUrl, details, sku, publishedDate);
    res.status(201).json({ id: result.lastInsertRowid, name, price, imageUrl, details, sku, publishedDate });
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, imageUrl, details, sku, publishedDate } = req.body;
    db.prepare('UPDATE products SET name = ?, price = ?, imageUrl = ?, details = ?, sku = ?, publishedDate = ? WHERE id = ?')
        .run(name, price, imageUrl, details, sku, publishedDate, id);
    res.json({ id, name, price, imageUrl, details, sku, publishedDate });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servern körs på http://localhost:${3000}`);
});