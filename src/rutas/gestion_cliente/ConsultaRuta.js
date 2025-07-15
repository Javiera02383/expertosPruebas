const express = require('express');
const router = express.Router();
const consultaController = require('../../controladores/gestion_cliente/ConsultaController');

router.post('/consulta', consultaController.crearConsulta);
router.get('/consulta', consultaController.obtenerConsultas);
router.get('/consulta/:id', consultaController.obtenerConsultaPorId);
router.put('/consulta/:id', consultaController.editarConsulta);
router.delete('/consulta/:id', consultaController.eliminarConsulta);

module.exports = router;
