const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;
const secretKey = 'secretkey';
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors());
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
      price number,
      image TEXT      
    )
  `);
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );`)
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
  const { name, price, image } = req.body;

  // Вставка данных в базу данных
  db.run(
    'INSERT INTO cakes (name, price, image) VALUES (?, ?, ?)',
    [name, price, image],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      }

      res.status(201).json({ message: 'Торт добавлен успешно' });
    }
  );
});

app.get('/cakes/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM cakes WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Торт не найден' });
    }

    res.status(200).json(row);
  });
});

// Endpoint для обновления торта по ID
app.put('/cakes/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  db.run(
    'UPDATE cakes SET name = ?, price = ?, image = ? WHERE id = ?',
    [name, price, image, id],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      }

      res.status(200).json({ message: 'Торт обновлен успешно' });
    }
  );
});

// Endpoint для удаления торта по ID
app.delete('/cakes/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM cakes WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }

    res.status(200).json({ message: 'Торт удален успешно' });
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to register user' });
      }
      res.json({ message: 'User registered successfully' });
  });
});

// Аутентификация пользователя и выдача токена
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
      if (err || !user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
      res.json({ token });
  });
});

// Защищенный маршрут, требующий токен для доступа
app.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Invalid token' });
      }

      res.json({ message: 'Welcome to the protected route', user: decoded });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});