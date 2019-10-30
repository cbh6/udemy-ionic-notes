import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  Usuario.findOne({ email }, (err, userDB) => {
    if (err) throw err;

    if (!userDB)
      return res.json({ ok: false, msg: 'Usuario/contraseña no correcto' });

    if (userDB.compararPassword(password)) {
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });
      res.json({ ok: true, token: tokenUser });
    } else {
      return res.json({
        ok: false,
        msg: 'Usuario/contraseña no correcto ****'
      });
    }
  });
});

// Crear un usuario
userRoutes.post('/create', (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    nombre: req.body.nombre,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar
  };

  Usuario.create(user)
    .then(userDB => {
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });

      res.json({
        ok: true,
        token: tokenUser
      });
    })
    .catch(err => {
      res.json({
        ok: false,
        err
      });
    });
});

// Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {
  const user = {
    nombre: req.body.nombre || req.usuario.nombre,
    email: req.body.email || req.usuario.email,
    avatar: req.body.avatar || req.usuario.avatar
  };

  // con new: true nos devuelve el nuevo registro y no el anterior
  Usuario.findByIdAndUpdate(
    req.usuario._id,
    user,
    { new: true },
    (err, userDB) => {
      if (err) throw err;

      if (!userDB) {
        return res.json({
          ok: false,
          msg: 'No existe un usuario con ese ID'
        });
      }

      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });

      res.json({
        ok: true,
        token: tokenUser
      });
    }
  );
});

export default userRoutes;
