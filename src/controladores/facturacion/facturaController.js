const Factura = require('../../modelos/facturacion/Factura');
const db = require('../../configuraciones/db');
const FacturaDetalle = require('../../modelos/facturacion/FacturaDetalle');
const DetalleDescuento = require('../../modelos/facturacion/DetalleDescuento');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

//validaciones
const { body, validationResult } = require('express-validator');

exports.validarCrearFacturaCompleta = [
  body('factura.idFactura')
    .notEmpty().withMessage('idFactura es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('factura.idCliente')
    .notEmpty().withMessage('idCliente es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('factura.idFormaPago')
    .notEmpty().withMessage('idFormaPago es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('factura.idEmpleado')
    .notEmpty().withMessage('idEmpleado es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('factura.Tipo_documento')
    .optional()
    .isString().withMessage('Tipo_documento debe ser texto')
    .isLength({ max: 45 }).withMessage('Máximo 45 caracteres'),

  body('factura.Fecha')
    .optional()
    .isISO8601().withMessage('Debe ser una fecha válida'),

  body('factura.Total_Facturado')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Total_Facturado debe ser un número positivo'),

  body('factura.estadoFactura')
    .optional()
    .isIn(['activa', 'anulada']).withMessage('estadoFactura debe ser "activa" o "anulada"'),

  // Validaciones básicas para los arrays
  body('detalles')
    .isArray({ min: 1 }).withMessage('Debes enviar al menos un detalle'),

  body('descuentos')
    .optional()
    .isArray().withMessage('descuentos debe ser un arreglo'),

  
];

// Middleware para manejar errores
exports.manejarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};



// Crear una factura simple
exports.crearFactura = async (req, res) => {
  try {
    const factura = await Factura.create(req.body);

    // --- Generar PDF de la factura aquí ---
    // Por ejemplo, usando pdfkit o cualquier otra librería
    // const doc = new PDFDocument();
    // doc.pipe(fs.createWriteStream(rutaPDF));
    // doc.text('Contenido de la factura...');
    // doc.end();

    // Simulación de nombre de archivo PDF
    const nombreArchivo = `factura_${factura.idFactura}.pdf`;
    const rutaPDF = path.join(__dirname, '../../uploads', nombreArchivo);

    // Aquí deberías generar y guardar el PDF en rutaPDF

    // Guardar el nombre del archivo PDF en la factura
    factura.archivo_pdf = nombreArchivo;
    await factura.save();

    res.status(201).json({ mensaje: 'Factura creada', factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear factura', error: error.message });
  }
};

// Obtener todas las facturas
exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll();
    res.json({ facturas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener facturas', error: error.message });
  }
};

// Obtener factura por ID
exports.obtenerFacturaPorId = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    res.json({ factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener factura', error: error.message });
  }
};

// Editar una factura
exports.editarFactura = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });

    await factura.update(req.body);
    res.json({ mensaje: 'Factura actualizada', factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar factura', error: error.message });
  }
};

// Anular una factura
exports.anularFactura = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });

    factura.anulada = true; // o factura.estado = 'anulada';
    await factura.save();

    res.json({ mensaje: 'Factura anulada', factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al anular factura', error: error.message });
  }
};

// Crear una factura completa (con detalles y descuentos)
exports.crearFacturaCompleta = async (req, res) => {
  const t = await db.transaction();

  try {
    const { factura, detalles, descuentos } = req.body;

    // 1. Crear factura
    const nuevaFactura = await Factura.create(factura, { transaction: t });

    // 2. Agregar ID a los detalles
    for (let d of detalles) {
      d.Factura_idFactura = nuevaFactura.idFactura;
    }

    // 3. Crear detalles
    await FacturaDetalle.bulkCreate(detalles, { transaction: t });

    // 4. Agregar ID a los descuentos
    for (let d of descuentos) {
      d.idFactura = nuevaFactura.idFactura;
    }

    // 5. Crear descuentos
    await DetalleDescuento.bulkCreate(descuentos, { transaction: t });

    // --- Generar PDF de la factura ---
    const nombreArchivo = `factura_${nuevaFactura.idFactura}.pdf`;
    const rutaPDF = path.join(__dirname, '../../uploads', nombreArchivo);

    // Crear el PDF
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(rutaPDF));
    doc.fontSize(20).text('Factura', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`ID: ${nuevaFactura.idFactura}`);
    doc.text(`Fecha: ${nuevaFactura.Fecha}`);
    doc.text(`Total: ${nuevaFactura.Total_Facturado}`);
    // Puedes agregar más datos aquí según tu modelo

    doc.end();

    // Guardar el nombre del archivo PDF en la factura
    nuevaFactura.archivo_pdf = nombreArchivo;
    await nuevaFactura.save({ transaction: t });

    // 6. Confirmar
    await t.commit();
    res.status(201).json({
      mensaje: 'Factura completa registrada con éxito',
      factura: nuevaFactura
    });

  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear factura completa', error: error.message });
  }
};

