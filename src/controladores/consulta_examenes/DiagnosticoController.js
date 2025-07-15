const { body, validationResult } = require('express-validator');
const Diagnostico = require('../../modelos/consulta_examenes/Diagnostico');

// Crear diagnóstico
exports.crearDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.create(req.body);
    res.status(201).json({ mensaje: 'Diagnóstico creado', diagnostico });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear diagnóstico', error: error.message });
  }
};

// Obtener todos los diagnósticos
exports.obtenerDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await Diagnostico.findAll();
    res.json(diagnosticos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener diagnósticos', error: error.message });
  }
};

// Obtener diagnóstico por ID
exports.obtenerDiagnosticoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const diagnostico = await Diagnostico.findByPk(id);
    if (!diagnostico) return res.status(404).json({ mensaje: 'Diagnóstico no encontrado' });
    res.json(diagnostico);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener diagnóstico', error: error.message });
  }
};

// Editar diagnóstico
exports.editarDiagnostico = async (req, res) => {
  const { id } = req.params;
  try {
    const diagnostico = await Diagnostico.findByPk(id);
    if (!diagnostico) return res.status(404).json({ mensaje: 'Diagnóstico no encontrado' });
    await diagnostico.update(req.body);
    res.json({ mensaje: 'Diagnóstico actualizado', diagnostico });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar diagnóstico', error: error.message });
  }
};

// Eliminar diagnóstico
exports.eliminarDiagnostico = async (req, res) => {
  const { id } = req.params;
  try {
    const diagnostico = await Diagnostico.findByPk(id);
    if (!diagnostico) return res.status(404).json({ mensaje: 'Diagnóstico no encontrado' });
    await diagnostico.destroy();
    res.json({ mensaje: 'Diagnóstico eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar diagnóstico', error: error.message });
  }
}; 