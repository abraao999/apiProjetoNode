import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { autorizacao } = req.headers;
  console.log(autorizacao);
  if (!autorizacao) { return res.status(401).json({ erros: 'login requerido' }); }
  const [, tokem] = autorizacao.split(' ');
  try {
    const dados = jwt.verify(tokem, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({ where: { id, email } });
    if (!user) { return res.status(401).json({ erros: 'usuario invalido' }); }
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(404).json({ erros: 'token expirado ou invalido' });
  }
};
