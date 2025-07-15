const express = require('express');
const router = express.Router();
const empleadoController = require('../../controladores/gestion_cliente/EmpleadoController');

router.post('/empleado', empleadoController.crearEmpleado);
router.get('/empleado', empleadoController.obtenerEmpleados);
router.get('/empleado/:id', empleadoController.obtenerEmpleadoPorId);
router.put('/empleado/:id', empleadoController.editarEmpleado);
router.delete('/empleado/:id', empleadoController.eliminarEmpleado);

module.exports = router;
