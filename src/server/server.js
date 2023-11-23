const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;
const secretKey = 'secretkey';
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
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
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 3;
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  const sqlQuery = `SELECT * FROM cakes LIMIT ${limit} OFFSET ${offset}`;
  console.log(sqlQuery);
  // Получение данных из базы данных
  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }

    res.status(200).json(rows);
  });
});

app.get('/searchcakes', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 3;
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  const query = `SELECT * FROM cakes LIMIT ${limit} OFFSET ${offset}`;
  console.log(query);
  db.all(query, (err, rows) => {
    
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
    
    res.status(200).json(rows);
  });
});

// Endpoint для получения списка всех тортов из поиска
app.get('/searchcakes/:cakename', (req, res) => {
  const { cakename } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 3;
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  
  if (cakename === undefined || cakename.trim() === '') {
    return res.status(400).json({ error: 'Invalid cakename parameter' });
  } 
  const query = `SELECT * FROM cakes WHERE name LIKE ? || "%" LIMIT ${limit} OFFSET ${offset}`;
  console.log(query);
  // Получение данных из базы данных
  const params = cakename ? [cakename] : [];
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }

    res.status(200).json(rows);
  });
});

// Endpoint для получения кол-ва тортов
app.get('/countcakes', (req, res) => {
  db.get('SELECT count(*) FROM cakes', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
    res.status(200).json(rows);
  });
});

// Endpoint для получения кол-ва тортов из поиска
app.get('/countcakes/:cakename', (req, res) => {
  const { cakename } = req.params;

  if (cakename === undefined || cakename.trim() === '') {
    return res.status(400).json({ error: 'Invalid cakename parameter' });
  } 
  const query = 'SELECT count(*) FROM cakes WHERE name LIKE ? || "%"';
  // Получение данных из базы данных
  const params = cakename ? [cakename] : [];
  db.get(query, params, (err, rows) => {
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

app.post('/addcakess', (req, res) => {
  const cakesToAdd = req.body;
  console.log('Received request:', req.body);

  if (!Array.isArray(cakesToAdd) || cakesToAdd.length === 0) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Using a transaction for better performance and atomicity
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    const placeholders = cakesToAdd.map(() => '(?, ?, ?)').join(', ');

    const query = `
      INSERT INTO cakes (name, price, image)
      VALUES ${placeholders}
    `;

    const values = cakesToAdd.flatMap(cake => [cake.name, cake.price, cake.image]);

    db.run(query, values, (err) => {
      if (err) {
        console.error(err.message);
        db.run('ROLLBACK'); // Rollback the transaction in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      db.run('COMMIT', (commitErr) => {
        if (commitErr) {
          console.error(commitErr.message);
          return res.status(500).json({ error: 'Error committing transaction' });
        }

        res.status(201).json({ message: 'Cakes added successfully' });
      });
    });
  });
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


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds); 

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to register user' });
      }
      res.json({ message: 'User registered successfully' });
  });
});

// Аутентификация пользователя и выдача токена
app.post('/login', async(req, res) => {
  const { username, password } = req.body;
  try {
  db.get('SELECT * FROM users WHERE username = ? ', [username], async (err, user) => {
      if (err || !user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
      res.json({ token });
  });
  } catch (error) {
  console.error('Error during login:', error);
  res.status(500).json({ error: 'Failed to login' });
}
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