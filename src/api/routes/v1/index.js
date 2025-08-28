const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const pacienteRoutes = require('./paciente.route');
const citaRoutes = require('./cita.route');
const administradorasRouter = require('./administradora.route')
const turnosRouter = require('./turnos.route')
const tokenRoutes = require('./tokenAuthorize.route');
const especialidadesRouter = require('./especialidades.route')
const { tokenAuthorize } = require( '../../middlewares/tokenAuthorize')
const app = express()

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/token/api', tokenRoutes)

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
// middleware para validar token y acceder a las rutas
router.use(tokenAuthorize);
//rutas del modulo  citas
router.use('/pacientes', pacienteRoutes);
router.use('/citas', citaRoutes);
router.use('/administradoras', administradorasRouter )
router.use('/turnos', turnosRouter)
router.use('/especialidades', especialidadesRouter) 
module.exports = router;
