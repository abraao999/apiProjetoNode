import dontenv from 'dotenv';
import { resolve } from 'path';

dontenv.config();
import './database';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokemRoutes from './routes/tokemRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whiteList = [
  // dados do servidor
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error('not allowed by cors'));
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // this.app.use(cors(corsOptions));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokem/', tokemRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}
export default new App().app;
