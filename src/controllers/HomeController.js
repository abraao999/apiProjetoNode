import Aluno from '../models/Aluno';

class HomeController {
  index(req, res) {
    res.json('HomePage');
  }
}
export default new HomeController();
