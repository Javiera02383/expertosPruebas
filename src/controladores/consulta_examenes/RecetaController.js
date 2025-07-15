const { body, validationResult } = require('express-validator');
const Receta = require('../../modelos/consulta_examenes/Receta');

// Crear receta
exports.crearReceta = async (req, res) => {
  try {
    const receta = await Receta.create(req.body);
    res.status(201).json({ mensaje: 'Receta creada', receta });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear receta', error: error.message });
  }
};

// Obtener todas las recetas
exports.obtenerRecetas = async (req, res) => {
  try {
    const recetas = await Receta.findAll();
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener recetas', error: error.message });
  }
};

// Obtener receta por ID
exports.obtenerRecetaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) return res.status(404).json({ mensaje: 'Receta no encontrada' });
    res.json(receta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener receta', error: error.message });
  }
};

// Editar receta
exports.editarReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) return res.status(404).json({ mensaje: 'Receta no encontrada' });
    await receta.update(req.body);
    res.json({ mensaje: 'Receta actualizada', receta });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar receta', error: error.message });
  }
};

// Eliminar receta
exports.eliminarReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id);
    if (!receta) return res.status(404).json({ mensaje: 'Receta no encontrada' });
    await receta.destroy();
    res.json({ mensaje: 'Receta eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar receta', error: error.message });
  }
}; 