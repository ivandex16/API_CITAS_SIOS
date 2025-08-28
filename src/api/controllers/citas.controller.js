const {
  agendarCitaService,
  cancelarCitasService,
} = require("../services/citas.service");
const httpStatus = require("http-status");
const {  logger } = require('../../config/logger')
const path = require('path');
const CitaDTO = require("../dtos/citas/cita.dto");
const CancelarCitaDTO = require("../dtos/citas/cancelarCita.dto");
const ProgramaPyMSDto = require("../dtos/citas/programaPyMS.dto");


//const logger = buildLogger(path.basename(__filename));



class CitasController {
  constructor(
    citasService,
    programaPyMSService
  ) {
    this.citasService = citasService;
    this.programaPyMSService = programaPyMSService
  }

  async agendarCita  (req, res, next) {
    try {
      const body = req.body;  
      const citaDto = CitaDTO.fromModel(body)
      const citaAgendada = await this.citasService.agendarCitaService(citaDto);
      //logger.log(citaAgendada)
      return res.status(citaAgendada.status).json(citaAgendada);
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  };


 async cancelarCita (req, res, next) {
      try {
        const body = req.body;
       const cancelarCitaDTO = CancelarCitaDTO.fromModel(body)
        const citaCancelada = await this.citasService.cancelarCita(cancelarCitaDTO);
        //logger.log(citaCancelada)
        return res.status(citaCancelada.status).json(citaCancelada);
      } catch (error) {
        logger.error(error.message);
        next(error);
      }
    };


 }

 module.exports = CitasController;

