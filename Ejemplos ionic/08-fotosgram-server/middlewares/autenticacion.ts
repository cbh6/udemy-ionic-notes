import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';

export const verificaToken = (req: any, res: Response, next: NextFunction) => {
  const userToken = req.get('x-token') || '';

  Token.comprobarToken(userToken)
    .then((decoded: any) => {
      req.usuario = decoded.usuario;
      next();
    })
    .catch(err => {
      res.json({ ok: false, msg: 'Token inválido' });
    });
};
