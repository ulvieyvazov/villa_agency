// const express = require('express');
// const app = express();

// app.use(express.json());


// let villas = [];

// app.get('/villas', (req, res) => {
//     res.json(villas);
// });

// app.get('/villas/:id', (req, res) => {
//     const { id } = req.params;
//     const villa = villas.find(u => u.id === parseInt(id));
//     if (!villa) {
//         return res.status(404).json({ message: 'products tapılmadı!' });
//     }
//     res.json(villa);
// });

// app.post('/villas', (req, res) => {
//     const { name, price, category, img, rating, detailimg, bedrooms, bathrooms, area, floor } = req.body;

//     if (!name || !price || !category || !img || !rating || !detailimg || !bedrooms || !bathrooms || !area || !floor) {
//         return res.status(400).json({ message: 'Bütün məlumatları doldurun' });
//     }

//     const newvilla = {
//         id: villas.length + 1,
//         name,
//         price,
//         category,
//         img,
//         rating,
//         detailimg,
//         bedrooms,
//         bathrooms,
//         area,
//         floor,
//     };

//     villas.push(newvilla);
//     res.status(201).json({ message: 'Villa əlavə olundu', villa: newvilla });
// });

// app.put('/villas/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, price, category, img, rating, detailimg, bedrooms, bathrooms, area, floor } = req.body;

//     const villa = villas.find(u => u.id === parseInt(id));
//     if (!villa) {
//         return res.status(404).json({ message: 'İstifadəçi tapılmadı!' });
//     }

//     if (name) villa.name = name;
//     if (price) villa.price = price;
//     if (img) villa.img = img;
//     if (category) villa.category = category;
//     if (rating) villa.rating = rating;
//     if (detailimg) villa.detailimg = detailimg;
//     if (bedrooms) villa.bedrooms = bedrooms;
//     if (bathrooms) villa.bathrooms = bathrooms;
//     if (area) villa.area = area;
//     if (floor) villa.floor = floor;

//     res.json({ message: 'Villa yeniləndi', villa });
// });

// app.delete('/villas/:id', (req, res) => {
//     const { id } = req.params;
//     const index = villas.findIndex(u => u.id === parseInt(id));

//     if (index === -1) {
//         return res.status(404).json({ message: 'Villa tapılmadı!' });
//     }

//     villas.splice(index, 1);
//     res.json({ message: 'Villa silindi' });
// });

// const PORT = 5050;
// app.listen(PORT, () => {
//     console.log(`Server http://localhost:${PORT} üzərində çalışır`);
// });
// {
//     "name": "18 New Street Miami, OR 97219",
//         "price": "2.264.000",
//             "category": "Luxury Villa",
//                 "img": "https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/single-property.jpg",
//                     "rating": 5,
//                         "detailimg": "https://templatemo.com/templates/templatemo_591_villa_agency/assets/images/single-property.jpg",
//                             "bedrooms": 8,
//                                 "bathrooms": 8,
//                                     "area": 545,
//                                         "floor": 3
// }


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// JSON formatında məlumatları oxumaq üçün middleware
app.use(express.json());

// Verilənlər bazası ilə əlaqə
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        return console.error('Verilənlər bazasına qoşulma xətası:', err.message);
    }
    console.log('SQLite verilənlər bazasına qoşuldu.');
});

// Cədvəl yaratmaq (əgər mövcud deyilsə)
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        password TEXT
    )
`);

// API: GET /users - Bütün istifadəçiləri əldə etmək
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }
        res.json(row);
    });
});


app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        res.json({ message: 'İstifadəçi silindi' });
    });
});

// ID-yə görə istifadəçi yeniləyən PUT metodu (bütün məlumatları yeniləyir)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, password } = req.body;
    if (!name || !age || !password) {
        return res.status(400).json({ message: 'Bütün məlumatları doldurun!' });
    }
    db.run(
        'UPDATE users SET name = ?, age = ?, password = ? WHERE id = ?',
        [name, age, password, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
            res.json({ message: 'İstifadəçi yeniləndi', user: { id, name, age, password } });
        }
    );
});

// ID-yə görə istifadəçi qismən yeniləyən PATCH metodu
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    if (fields.length === 0) {
        return res.status(400).json({ message: 'Yeniləmək üçün məlumat təqdim edilməyib!' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(id);

    db.run(`UPDATE users SET ${setClause} WHERE id = ?`, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        res.json({ message: 'İstifadəçi qismən yeniləndi', updatedFields: req.body });
    });
});


// API: POST /users - Yeni istifadəçi əlavə etmək
app.post('/users', (req, res) => {
    const { name, age, password } = req.body;

    if (!name || !age || !password) {
        return res.status(400).json({ message: 'Bütün məlumatları doldurun!' });
    }

    // Yeni istifadəçi əlavə etmək
    db.run('INSERT INTO users (name, age, password) VALUES (?, ?, ?)', [name, age, password], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'İstifadəçi əlavə olundu', user: { id: this.lastID, name, age, password } });
    });
});

// Serveri başlatmaq
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} üzərində çalışır`);
});
