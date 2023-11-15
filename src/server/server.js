const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Используйте body-parser для обработки JSON-запросов
app.use(bodyParser.json());

// Настройка базы данных SQLite
const db = new sqlite3.Database('./cakes.db');

// Создание таблицы для хранения данных о тортах
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cakes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price number
    )
  `);
});

// Endpoint для получения списка всех тортов
app.get('/cakes', (req, res) => {
  // Получение данных из базы данных
  db.all('SELECT * FROM cakes', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }

    res.status(200).json(rows);
  });
});

// Endpoint для добавления нового торта
app.post('/addcakes', (req, res) => {
  const { name, price } = req.body;

  // Вставка данных в базу данных
  db.run(
    'INSERT INTO cakes (name, price) VALUES (?, ?)',
    [name, price],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      }

      res.status(201).json({ message: 'Торт добавлен успешно' });
    }
  );
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});