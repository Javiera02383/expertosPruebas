const express = require('express');
const router = express.Router();
const clienteController = require('../../controladores/gestion_cliente/ClienteController');

router.post('/cliente', clienteController.crearCliente);
router.get('/cliente', clienteController.obtenerClientes);
router.get('/cliente/:id', clienteController.obtenerClientePorId);
router.put('/cliente/:id', clienteController.editarCliente);
router.delete('/cliente/:id', clienteController.eliminarCliente);

module.exports = router;
