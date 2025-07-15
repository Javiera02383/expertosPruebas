
const express = require('express');
const router = express.Router();
const formaPagoController = require('../../controladores/facturacion/formaPagoController');

/**
 * @swagger
 * tags:
 *   name: FormaPago
 *   description: Gestión de formas de pago
 */

/**
 * @swagger
 * /formas-pago:
 *   get:
 *     summary: Obtener todas las formas de pago
 *     tags: [FormaPago]
 *     responses:
 *       200:
 *         description: Lista de formas de pago
 */
router.get('/formas-pago', formaPagoController.obtenerFormasPago);

/**
 * @swagger
 * /forma-pago/{id}:
 *   get:
 *     summary: Obtener una forma de pago por ID
 *     tags: [FormaPago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la forma de pago
 *     responses:
 *       200:
 *         description: Objeto de forma de pago
 *       404:
 *         description: No encontrado
 */
router.get('/forma-pago/:id', formaPagoController.obtenerFormaPagoPorId);

/**
 * @swagger
 * /forma-pago:
 *   post:
 *     summary: Crear una nueva forma de pago
 *     tags: [FormaPago]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idFormaPago
 *               - Formapago
 *               - Estado
 *             properties:
 *               idFormaPago:
 *                 type: integer
 *               Formapago:
 *                 type: string
 *               Estado:
 *                 type: string
 *                 enum: [A, I]
 *     responses:
 *       201:
 *         description: Forma de pago creada
 *       400:
 *         description: Error de validación
 */
router.post('/forma-pago', formaPagoController.validarCrear, formaPagoController.crearFormaPago);

/**
 * @swagger
 * /forma-pago/{id}:
 *   put:
 *     summary: Actualizar una forma de pago existente
 *     tags: [FormaPago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la forma de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Formapago:
 *                 type: string
 *               Estado:
 *                 type: string
 *                 enum: [A, I]
 *     responses:
 *       200:
 *         description: Forma de pago actualizada
 *       404:
 *         description: No encontrada
 */
router.put('/forma-pago/:id', formaPagoController.validarEditar, formaPagoController.actualizarFormaPago);

/**
 * @swagger
 * /forma-pago/{id}:
 *   delete:
 *     summary: Eliminar una forma de pago
 *     tags: [FormaPago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la forma de pago
 *     responses:
 *       200:
 *         description: Eliminado con éxito
 *       404:
 *         description: No encontrado
 */
router.delete('/forma-pago/:id', formaPagoController.eliminarFormaPago);

module.exports = router;
