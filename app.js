import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import database from './src/config/database.js';
import routes from './src/routes/index.js';

dotenv.config();

const app = express();

// Conectar a la base de datos
await database.connect();

//app.use(cors());
app.use(cors({
  origin: '*', // O mejor, especifica tus orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
  }
));

//Aca invocamos las rutas.
app.use("/api", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});