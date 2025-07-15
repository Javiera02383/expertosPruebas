const express = require('express');
const router = express.Router();
const telefonoController = require('../../controladores/gestion_cliente/TelefonoController');

router.post('/telefono', telefonoController.crearTelefono);
router.get('/telefono', telefonoController.obtenerTelefonos);
router.get('/telefono/:id', telefonoController.obtenerTelefonoPorId);
router.put('/telefono/:id', telefonoController.editarTelefono);
router.delete('/telefono/:id', telefonoController.eliminarTelefono);

module.exports = router;
