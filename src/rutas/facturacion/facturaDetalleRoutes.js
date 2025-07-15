const express = require('express');
const router = express.Router();
const facturaDetalleController = require('../../controladores/facturacion/facturaDetalleController');

/**
 * @swagger
 * tags:
 *   name: FacturaDetalle
 *   description: Gestión de los detalles de las facturas
 */

/**
 * @swagger
 * /factura-detalle:
 *   post:
 *     summary: Crear un nuevo detalle de factura
 *     tags: [FacturaDetalle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idFactura
 *               - idProducto
 *               - cantidad
 *               - precioUnitario
 *             properties:
 *               idFactura:
 *                 type: integer
 *               idProducto:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *               precioUnitario:
 *                 type: number
 *     responses:
 *       201:
 *         description: Detalle creado correctamente
 *       400:
 *         description: Error de validación o datos incompletos
 */
router.post('/factura-detalle', facturaDetalleController.crearDetalle);

/**
 * @swagger
 * /factura-detalles:
 *   get:
 *     summary: Obtener todos los detalles de factura
 *     tags: [FacturaDetalle]
 *     responses:
 *       200:
 *         description: Lista de detalles de factura
 */
router.get('/factura-detalles', facturaDetalleController.obtenerDetalles);

/**
 * @swagger
 * /factura-detalle/{id}:
 *   get:
 *     summary: Obtener un detalle de factura por ID
 *     tags: [FacturaDetalle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *       404:
 *         description: Detalle no encontrado
 */
router.get('/factura-detalle/:id', facturaDetalleController.obtenerDetallePorId);

/**
 * @swagger
 * /factura-detalle/{id}:
 *   put:
 *     summary: Editar un detalle de factura
 *     tags: [FacturaDetalle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProducto:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *               precioUnitario:
 *                 type: number
 *     responses:
 *       200:
 *         description: Detalle actualizado correctamente
 *       404:
 *         description: Detalle no encontrado
 */
router.put('/factura-detalle/:id', facturaDetalleController.editarDetalle);

/**
 * @swagger
 * /factura-detalle/{id}:
 *   delete:
 *     summary: Eliminar un detalle de factura
 *     tags: [FacturaDetalle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       404:
 *         description: Detalle no encontrado
 */
router.delete('/factura-detalle/:id', facturaDetalleController.eliminarDetalle);

module.exports = router;

 