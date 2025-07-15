const express = require('express');
const router = express.Router();
const facturaController = require('../../controladores/facturacion/facturaController');

/**
 * @swagger
 * tags:
 *   name: Factura
 *   description: Gestión de facturas
 */

/**
 * @swagger
 * /factura:
 *   post:
 *     summary: Crear una factura completa
 *     tags: [Factura]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Aquí deberías definir las propiedades del objeto factura completo según tu modelo
 *     responses:
 *       201:
 *         description: Factura creada correctamente
 *       400:
 *         description: Error de validación o datos incompletos
 */
router.post('/factura', facturaController.crearFactura);

/**
 * @swagger
 * /factura-completa:
 *   post:
 *     summary: Crear una factura completa (alias)
 *     tags: [Factura]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Igual que el anterior
 *     responses:
 *       201:
 *         description: Factura creada correctamente
 */
router.post('/factura-completa', facturaController.validarCrearFacturaCompleta,
  facturaController.manejarErrores, facturaController.crearFacturaCompleta);

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Factura]
 *     responses:
 *       200:
 *         description: Lista de facturas
 */
router.get('/facturas', facturaController.obtenerFacturas);

/**
 * @swagger
 * /factura/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: [Factura]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 */
router.get('/factura/:id', facturaController.obtenerFacturaPorId);

/**
 * @swagger
 * /factura/{id}:
 *   put:
 *     summary: Editar una factura
 *     tags: [Factura]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Define aquí las propiedades que pueden editarse
 *     responses:
 *       200:
 *         description: Factura actualizada correctamente
 *       404:
 *         description: Factura no encontrada
 */
router.put('/factura/:id', facturaController.editarFactura);

/**
 * @swagger
 * /facturas/{id}/anular:
 *   put:
 *     summary: Anular una factura
 *     tags: [Factura]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a anular
 *     responses:
 *       200:
 *         description: Factura anulada correctamente
 *       404:
 *         description: Factura no encontrada
 */
router.put('/facturas/:id/anular', facturaController.anularFactura);

module.exports = router;

