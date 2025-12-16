import { Cita, Doctor, Especialidad, Usuario } from "../models/";

//obtener listas de cistas
const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Doctor,
          include: [Especialidad],
        },
        {
          model: Usuario,
        },
      ],
    });

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//crear nueva cita
const createCita = async (req, res) => {
  try {
    const { usuarioId, doctorId, fecha, hora, tipoConsulta, motivo } = req.body;

    // Validación mínima
    if (!usuarioId || !doctorId || !fecha || !hora || !tipoConsulta) {
      return res.status(400).json({
        message: "Campos obligatorios incompletos",
      });
    }

    // Verificar duplicado (misma fecha y hora)
    const citaExistente = await Cita.findOne({
      where: { doctorId, fecha, hora },
    });

    if (citaExistente) {
      return res.status(409).json({
        message: "La hora seleccionada ya está ocupada",
      });
    }

    const nuevaCita = await Cita.create({
      usuarioId,
      doctorId,
      fecha,
      hora,
      tipoConsulta,
      motivo,
    });

    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Cuerpos de especialdiad
const getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.status(200).json(especialidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//cuerpos de doctores por especialidad
const getDoctores = async (req, res) => {
  try {
    const { especialidadId } = req.query;

    const where = especialidadId ? { especialidadId } : {};

    const doctores = await Doctor.findAll({
      where,
      include: [Especialidad],
    });

    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//disponibilidad de citas por doctor y fecha
const getDisponibilidad = async (req, res) => {
  try {
    const { doctorId, fecha } = req.query;

    if (!doctorId || !fecha) {
      return res.status(400).json({
        message: "doctorId y fecha son requeridos",
      });
    }

    const horasBase = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const citas = await Cita.findAll({
      where: { doctorId, fecha },
    });

    const horasOcupadas = citas.map((c) => c.hora);
    const horasDisponibles = horasBase.filter(
      (h) => !horasOcupadas.includes(h)
    );

    res.status(200).json(horasDisponibles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCitas,
  createCita,
  getEspecialidades,
  getDoctores,
  getDisponibilidad,
};
