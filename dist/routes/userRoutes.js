"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequered = require('../middlewares/loginRequered'); var _loginRequered2 = _interopRequireDefault(_loginRequered);

const router = new (0, _express.Router)();

router.get('/', _loginRequered2.default, _UserController2.default.index);
router.get('/:id', _UserController2.default.show);

router.post('/', _UserController2.default.store);
router.put('/', _loginRequered2.default, _UserController2.default.update);
router.delete('/', _loginRequered2.default, _UserController2.default.delete);
exports. default = router;
