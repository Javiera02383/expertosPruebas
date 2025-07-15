const express = require('express');
const router = express.Router();
const descuentoController = require('../../controladores/facturacion/descuentoController');

/**
 * @swagger
 * tags:
 *   name: Descuento
 *   description: Gestión de descuentos
 */

/**
 * @swagger
 * /descuentos:
 *   get:
 *     summary: Obtener todos los descuentos
 *     tags: [Descuento]
 *     responses:
 *       200:
 *         description: Lista de descuentos
 */
router.get('/descuentos', descuentoController.obtenerDescuentos);

/**
 * @swagger
 * /descuento/{id}:
 *   get:
 *     summary: Obtener un descuento por ID
 *     tags: [Descuento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del descuento
 *     responses:
 *       200:
 *         description: Descuento encontrado
 *       404:
 *         description: Descuento no encontrado
 */
router.get('/descuento/:id', descuentoController.obtenerDescuentoPorId);

/**
 * @swagger
 * /descuento:
 *   post:
 *     summary: Crear un nuevo descuento
 *     tags: [Descuento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idDescuento
 *               - Nombre
 *               - Porcentaje
 *               - Estado
 *             properties:
 *               idDescuento:
 *                 type: integer
 *               Nombre:
 *                 type: string
 *               Porcentaje:
 *                 type: number
 *               Estado:
 *                 type: string
 *                 enum: [A, I]
 *     responses:
 *       201:
 *         description: Descuento creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/descuento', descuentoController.validarCrear, descuentoController.crearDescuento);

/**
 * @swagger
 * /descuento/{id}:
 *   put:
 *     summary: Actualizar un descuento existente
 *     tags: [Descuento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del descuento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               Porcentaje:
 *                 type: number
 *               Estado:
 *                 type: string
 *                 enum: [A, I]
 *     responses:
 *       200:
 *         description: Descuento actualizado correctamente
 *       404:
 *         description: Descuento no encontrado
 */
router.put('/descuento/:id', descuentoController.validarEditar, descuentoController.actualizarDescuento);

/**
 * @swagger
 * /descuento/{id}:
 *   delete:
 *     summary: Eliminar un descuento por ID
 *     tags: [Descuento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del descuento
 *     responses:
 *       200:
 *         description: Descuento eliminado correctamente
 *       404:
 *         description: Descuento no encontrado
 */
router.delete('/descuento/:id', descuentoController.eliminarDescuento);

module.exports = router;
