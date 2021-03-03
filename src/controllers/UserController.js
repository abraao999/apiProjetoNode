import e, { json } from 'express';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (er) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const users = await User.findByPk(id);
      const { nome, email } = users;
      return res.json({ id, nome, email });
    } catch (er) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const users = await User.findByPk(req.userId);
      if (!users) { return res.status(400).json({ erros: ['usuario nao existe'] }); }
      const novosDados = await users.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }

  async delete(req, res) {
    try {
      const users = await User.findByPk(req.userId);
      if (!users) { return res.status(400).json({ erros: ['usuario nao existe'] }); }
      await users.destroy();
      return res.json(null);
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }
}
export default new UserController();
