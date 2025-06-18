const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/products/:id/reviews', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM reviews WHERE productId = ?', [productId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


app.post('/products/:id/reviews', (req, res) => {
  const { userId, rating, review } = req.body;
  const productId = req.params.id;

  db.query(
    'SELECT * FROM reviews WHERE userId = ? AND productId = ?',
    [userId, productId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) {
        return res.status(400).json({ message: 'You’ve already reviewed this product!' });
      }

      db.query(
        'INSERT INTO reviews (userId, productId, rating, review) VALUES (?, ?, ?, ?)',
        [userId, productId, rating, review],
        (err, result) => {
          if (err) return res.status(500).send(err);
          res.status(200).json({ message: 'Review added!' });
        }
      );
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
