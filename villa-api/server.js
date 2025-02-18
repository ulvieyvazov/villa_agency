const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');

// JSON formatında məlumatları oxumaq üçün middleware

app.use(cors()); 

app.use(express.json());

// Verilənlər bazası ilə əlaqə
const db = new sqlite3.Database('./villas.db', (err) => {
    if (err) {
        return console.error('Verilənlər bazasına qoşulma xətası:', err.message);
    }
    console.log('SQLite verilənlər bazasına qoşuldu.');
});

// Cədvəl yaratmaq (əgər mövcud deyilsə)
db.run(`
    CREATE TABLE IF NOT EXISTS villas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        catagory TEXT,
        img TEXT,
        bedrooms INTEGER,
        bathrooms INTEGER,
        area INTEGER,
        floor INTEGER,
        rating INTEGER
    )
`);

// API: GET /villas - Bütün villaları əldə etmək
app.get('/villas', (req, res) => {
    db.all('SELECT * FROM villas', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// API: GET /villas/:id - ID-yə görə villa əldə etmək
app.get('/villas/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM villas WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Villa tapılmadı' });
        }
        res.json(row);
    });
});

// API: POST /villas - Yeni villa əlavə etmək
app.post('/villas', (req, res) => {
    const { name, price, catagory, img, bedrooms, bathrooms, area, floor, rating } = req.body;

    if (!name || !price || !catagory || !img || !bedrooms || !bathrooms || !area || !floor || !rating) {
        return res.status(400).json({ message: 'Bütün məlumatları doldurun!' });
    }

    db.run(
        'INSERT INTO villas (name, price, catagory, img, bedrooms, bathrooms, area, floor, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, price, catagory, img, bedrooms, bathrooms, area, floor, rating],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'Villa əlavə olundu',
                villa: { id: this.lastID, name, price, catagory, img, bedrooms, bathrooms, area, floor, rating }
            });
        }
    );
});

// API: PUT /villas/:id - ID-yə görə villanı tamamilə yeniləmək
app.put('/villas/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, catagory, img, bedrooms, bathrooms, area, floor, rating } = req.body;

    if (!name || !price || !catagory || !img || !bedrooms || !bathrooms || !area || !floor || !rating) {
        return res.status(400).json({ message: 'Bütün məlumatları doldurun!' });
    }

    db.run(
        'UPDATE villas SET name = ?, price = ?, catagory = ?, img = ?, bedrooms = ?, bathrooms = ?, area = ?, floor = ?, rating = ? WHERE id = ?',
        [name, price, catagory, img, bedrooms, bathrooms, area, floor, rating, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Villa tapılmadı' });
            }
            res.json({
                message: 'Villa yeniləndi',
                villa: { id, name, price, catagory, img, bedrooms, bathrooms, area, floor, rating }
            });
        }
    );
});

// API: PATCH /villas/:id - ID-yə görə villanı qismən yeniləmək
app.patch('/villas/:id', (req, res) => {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    if (fields.length === 0) {
        return res.status(400).json({ message: 'Yeniləmək üçün məlumat təqdim edilməyib!' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(id);

    db.run(`UPDATE villas SET ${setClause} WHERE id = ?`, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Villa tapılmadı' });
        res.json({ message: 'Villa qismən yeniləndi', updatedFields: req.body });
    });
});

// API: DELETE /villas/:id - ID-yə görə villanı silmək
app.delete('/villas/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM villas WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Villa tapılmadı' });
        res.json({ message: 'Villa silindi' });
    });
});

// Serveri başlatmaq
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} üzərində çalışır`);
});
