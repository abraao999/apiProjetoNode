"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (er) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const users = await _User2.default.findByPk(id);
      const { nome, email } = users;
      return res.json({ id, nome, email });
    } catch (er) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const users = await _User2.default.findByPk(req.userId);
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
      const users = await _User2.default.findByPk(req.userId);
      if (!users) { return res.status(400).json({ erros: ['usuario nao existe'] }); }
      await users.destroy();
      return res.json(null);
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }
}
exports. default = new UserController();
