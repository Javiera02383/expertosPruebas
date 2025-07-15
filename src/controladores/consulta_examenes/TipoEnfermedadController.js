const { body, validationResult } = require('express-validator');
const TipoEnfermedad = require('../../modelos/consulta_examenes/TipoEnfermedad');

// Crear tipo de enfermedad
exports.crearTipoEnfermedad = async (req, res) => {
  try {
    const tipoEnfermedad = await TipoEnfermedad.create(req.body);
    res.status(201).json({ mensaje: 'Tipo de enfermedad creado', tipoEnfermedad });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tipo de enfermedad', error: error.message });
  }
};

// Obtener todos los tipos de enfermedad
exports.obtenerTiposEnfermedad = async (req, res) => {
  try {
    const tiposEnfermedad = await TipoEnfermedad.findAll();
    res.json(tiposEnfermedad);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tipos de enfermedad', error: error.message });
  }
};

// Obtener tipo de enfermedad por ID
exports.obtenerTipoEnfermedadPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoEnfermedad = await TipoEnfermedad.findByPk(id);
    if (!tipoEnfermedad) return res.status(404).json({ mensaje: 'Tipo de enfermedad no encontrado' });
    res.json(tipoEnfermedad);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tipo de enfermedad', error: error.message });
  }
};

// Editar tipo de enfermedad
exports.editarTipoEnfermedad = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoEnfermedad = await TipoEnfermedad.findByPk(id);
    if (!tipoEnfermedad) return res.status(404).json({ mensaje: 'Tipo de enfermedad no encontrado' });
    await tipoEnfermedad.update(req.body);
    res.json({ mensaje: 'Tipo de enfermedad actualizado', tipoEnfermedad });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar tipo de enfermedad', error: error.message });
  }
};

// Eliminar tipo de enfermedad
exports.eliminarTipoEnfermedad = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoEnfermedad = await TipoEnfermedad.findByPk(id);
    if (!tipoEnfermedad) return res.status(404).json({ mensaje: 'Tipo de enfermedad no encontrado' });
    await tipoEnfermedad.destroy();
    res.json({ mensaje: 'Tipo de enfermedad eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tipo de enfermedad', error: error.message });
  }
}; 