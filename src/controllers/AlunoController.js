import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async storage(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      if (!aluno) {
        return res.status(400).json({ erros: ['aluno nao existe'] });
      }

      return res.json(aluno);
    } catch (er) {
      return res.status(400).json({ erros: er.errors.map((erro) => erro.message) });
    }
  }

  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: { model: Foto, attributes: ['url', 'filename'] },
    });
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ erros: ['faltando id'] });
      }

      const alunos = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: { model: Foto, attributes: ['url', 'filename'] },
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

      const aluno = await Aluno.findByPk(id);
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

      const aluno = await Aluno.findByPk(id);
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
export default new AlunoController();
