const { body, validationResult } = require('express-validator');
const Telefono = require('../../modelos/gestion_cliente/Telefono');

// Crear teléfono
exports.crearTelefono = async (req, res) => {
  try {
    const telefono = await Telefono.create(req.body);
    res.status(201).json({ mensaje: 'Teléfono creado', telefono });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear teléfono', error: error.message });
  }
};

// Obtener todos los teléfonos
exports.obtenerTelefonos = async (req, res) => {
  try {
    const telefonos = await Telefono.findAll();
    res.json(telefonos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener teléfonos', error: error.message });
  }
};

// Obtener teléfono por ID
exports.obtenerTelefonoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const telefono = await Telefono.findByPk(id);
    if (!telefono) return res.status(404).json({ mensaje: 'Teléfono no encontrado' });
    res.json(telefono);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener teléfono', error: error.message });
  }
};

// Editar teléfono
exports.editarTelefono = async (req, res) => {
  const { id } = req.params;
  try {
    const telefono = await Telefono.findByPk(id);
    if (!telefono) return res.status(404).json({ mensaje: 'Teléfono no encontrado' });
    await telefono.update(req.body);
    res.json({ mensaje: 'Teléfono actualizado', telefono });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar teléfono', error: error.message });
  }
};

// Eliminar teléfono
exports.eliminarTelefono = async (req, res) => {
  const { id } = req.params;
  try {
    const telefono = await Telefono.findByPk(id);
    if (!telefono) return res.status(404).json({ mensaje: 'Teléfono no encontrado' });
    await telefono.destroy();
    res.json({ mensaje: 'Teléfono eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar teléfono', error: error.message });
  }
};
