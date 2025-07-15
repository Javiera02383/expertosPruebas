const { body, validationResult } = require('express-validator');
const Examen_Vista = require('../../modelos/consulta_examenes/Examen_Vista');

// Crear examen de vista
exports.crearExamenVista = async (req, res) => {
  try {
    const examenVista = await Examen_Vista.create(req.body);
    res.status(201).json({ mensaje: 'Examen de vista creado', examenVista });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear examen de vista', error: error.message });
  }
};

// Obtener todos los exámenes de vista
exports.obtenerExamenesVista = async (req, res) => {
  try {
    const examenesVista = await Examen_Vista.findAll();
    res.json(examenesVista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener exámenes de vista', error: error.message });
  }
};

// Obtener examen de vista por ID
exports.obtenerExamenVistaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const examenVista = await Examen_Vista.findByPk(id);
    if (!examenVista) return res.status(404).json({ mensaje: 'Examen de vista no encontrado' });
    res.json(examenVista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener examen de vista', error: error.message });
  }
};

// Editar examen de vista
exports.editarExamenVista = async (req, res) => {
  const { id } = req.params;
  try {
    const examenVista = await Examen_Vista.findByPk(id);
    if (!examenVista) return res.status(404).json({ mensaje: 'Examen de vista no encontrado' });
    await examenVista.update(req.body);
    res.json({ mensaje: 'Examen de vista actualizado', examenVista });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar examen de vista', error: error.message });
  }
};

// Eliminar examen de vista
exports.eliminarExamenVista = async (req, res) => {
  const { id } = req.params;
  try {
    const examenVista = await Examen_Vista.findByPk(id);
    if (!examenVista) return res.status(404).json({ mensaje: 'Examen de vista no encontrado' });
    await examenVista.destroy();
    res.json({ mensaje: 'Examen de vista eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar examen de vista', error: error.message });
  }
}; 