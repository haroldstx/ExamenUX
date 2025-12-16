import express from "express";
import {
  getCitas,
  createCita,
  getEspecialidades,
  getDoctores,
  getDisponibilidad,
} from "../controller/citaController.js";

const router = express.Router();

router.get("/citas", getCitas);
router.post("/citas", createCita);

router.get("/especialidades", getEspecialidades);
router.get("/doctores", getDoctores);
router.get("/disponibilidad", getDisponibilidad);

export default router;
