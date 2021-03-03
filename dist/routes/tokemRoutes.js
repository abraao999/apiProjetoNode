"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TokemController = require('../controllers/TokemController'); var _TokemController2 = _interopRequireDefault(_TokemController);

const router = new (0, _express.Router)();

router.post('/', _TokemController2.default.store);
exports. default = router;
