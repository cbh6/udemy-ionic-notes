import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Rutas
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar db
mongoose.connect(
  'mongodb://localhost:27017/fotosgram',
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  err => {
    if (err) throw err;
    console.log('BD online');
  }
);

// Levantar express
server.start(() => console.log(`Servidor corriendo en puerto ${server.port}`));
