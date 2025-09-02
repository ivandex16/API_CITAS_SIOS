const { dateSinZonaHorariaToString } = require("../../utils/functionHelpers");
const moment = require("moment");

class CitaDTO {
    constructor(params) {
        this.sede = params.sede || '';
        this.medioSolicitud = params.medioSolicitud || '';
        this.Bprogramada = params.Bprogramada === true ? 1 : 0;
        this.tipoCita = params.tipoCita || '';
        this.idPaciente = params.idPaciente || '';
        this.Ipaciente = params.Ipaciente;
        this.fechaSolicitada = params.fechaSolicitada || '';
        this.fechaAsignada = params.fechaAsignada || '';
        this.prestador = params.prestador || '';
        this.especialidad = params.especialidad || '';
        this.consultorio = params.consultorio || '';
        this.administradora = params.administradora || '';
        this.tipoConsulta = params.tipoConsulta || '';
        this.fechaDeseada = params.fechaDeseada || '';
        this.idConsultorio = params.idConsultorio || '';
        this.idServicio = params.idServicio || "";
        this.idProgramaPyMS = params.idProgramaPyMS;
        this.bProgramaPyMS = params.bProgramaPyMS ? 1 : 0;
        this.usuario = params.usuario || "";
        this.idPlan = params.idPlan || "";
        this.idTurno = typeof params.idTurno === "string" ? parseInt(params.idTurno, 10) || 0 : params.idTurno || 0;

    }

    static fromModel(params) {
      
        const paramsDto = {
            sede : params.sede,
            medioSolicitud : params.medioSolicitud,
            Bprogramada : params.Bprogramada === true ? 1 : 0,
            tipoCita : params.tipoCita,
            idPaciente : params.idPaciente,
            Ipaciente : params.Ipaciente,
            fechaSolicitada : moment(params.fechaSolicitada).format('YYYY-MM-DDTHH:mm:ss'),
            fechaAsignada : moment(params.fechaAsignada).format('YYYY-MM-DDTHH:mm:ss'),
            prestador : params.prestador,
            especialidad : params.especialidad,
            consultorio : params.consultorio,
            administradora : params.administradora,
            tipoConsulta : params.tipoConsulta,
            fechaDeseada : moment(params.fechaDeseada).format('YYYY-MM-DDTHH:mm:ss'),
            idConsultorio : params.idConsultorio,
            idServicio : params.idServicio,
            usuario : params.usuario || "",
            idProgramaPyMS : params.idProgramaPyMS === "" || params.idProgramaPyMS === null || params.idProgramaPyMS === 0 ? null : params.idProgramaPyMS,
            idPlan : params.idPlan,
            idTurno : params.idTurno,
            //bProgramaPyMS : params.bProgramaPyMS,
            // ...programaPyMS

        }
        
       
        return new CitaDTO(paramsDto);
    }
}



module.exports = CitaDTO;

