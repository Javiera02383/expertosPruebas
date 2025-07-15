const { body, validationResult } = require('express-validator');
const ReparacionDeLentes = require('../../modelos/consulta_examenes/ReparacionDeLentes');

// Crear reparación de lentes
exports.crearReparacionDeLentes = async (req, res) => {
  try {
    const reparacionDeLentes = await ReparacionDeLentes.create(req.body);
    res.status(201).json({ mensaje: 'Reparación de lentes creada', reparacionDeLentes });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear reparación de lentes', error: error.message });
  }
};

// Obtener todas las reparaciones de lentes
exports.obtenerReparacionesDeLentes = async (req, res) => {
  try {
    const reparacionesDeLentes = await ReparacionDeLentes.findAll();
    res.json(reparacionesDeLentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reparaciones de lentes', error: error.message });
  }
};

// Obtener reparación de lentes por ID
exports.obtenerReparacionDeLentesPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const reparacionDeLentes = await ReparacionDeLentes.findByPk(id);
    if (!reparacionDeLentes) return res.status(404).json({ mensaje: 'Reparación de lentes no encontrada' });
    res.json(reparacionDeLentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reparación de lentes', error: error.message });
  }
};

// Editar reparación de lentes
exports.editarReparacionDeLentes = async (req, res) => {
  const { id } = req.params;
  try {
    const reparacionDeLentes = await ReparacionDeLentes.findByPk(id);
    if (!reparacionDeLentes) return res.status(404).json({ mensaje: 'Reparación de lentes no encontrada' });
    await reparacionDeLentes.update(req.body);
    res.json({ mensaje: 'Reparación de lentes actualizada', reparacionDeLentes });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar reparación de lentes', error: error.message });
  }
};

// Eliminar reparación de lentes
exports.eliminarReparacionDeLentes = async (req, res) => {
  const { id } = req.params;
  try {
    const reparacionDeLentes = await ReparacionDeLentes.findByPk(id);
    if (!reparacionDeLentes) return res.status(404).json({ mensaje: 'Reparación de lentes no encontrada' });
    await reparacionDeLentes.destroy();
    res.json({ mensaje: 'Reparación de lentes eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar reparación de lentes', error: error.message });
  }
}; 