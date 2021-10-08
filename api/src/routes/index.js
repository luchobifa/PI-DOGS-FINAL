var express = require('express');
var router = express.Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let dogsRouter =  require('./dogs');
let temperamentRouter =  require('./temperament');
let dogRouter =  require('./dog');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentRouter);
router.use('/dog', dogRouter)

module.exports = router;
