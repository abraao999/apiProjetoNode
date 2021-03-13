"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async storage(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      if (!aluno) {
        return res.status(400).json({ erros: ['aluno nao existe'] });
      }

      return res.json(aluno);
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }

  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: { model: _Foto2.default, attributes: ['url', 'filename'] },
    });
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['faltando id'] });
      }

      const alunos = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: { model: _Foto2.default, attributes: ['url', 'filename'] },
      });
      if (!alunos) {
        return res.status(400).json({ erros: ['aluno nao existe'] });
      }

      return res.json(alunos);
    } catch (error) {
      return res.status(400).json({ erros: error.erros.map((es) => es.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['faltando id'] });
      }

      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({ erros: ['aluno nao existe'] });
      }
      const novosDados = await aluno.update(req.body);
      return res.json(novosDados);
    } catch (error) {
      return res.status(400).json({ erros: error.erros.map((es) => es.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['faltando id'] });
      }

      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({ erros: ['aluno nao existe'] });
      }
      await aluno.destroy();
      return res.json({ apagado: true });
    } catch (error) {
      return res.status(400).json({ erros: error.erros.map((es) => es.message) });
    }
  }
}
exports. default = new AlunoController();
