const Joi = require('joi');
const { handleCustomErrorsJoi } = require( '../utils/functionHelpers')
const {validarPuntoRegex} = require('../utils/regexPattern');



module.exports = {
    cancelar: {
        body:{
            idCita: Joi.string().regex(validarPuntoRegex).required('El id de la cita es requerido').error(handleCustomErrorsJoi),
            fechaCancelacion: Joi.date().required('La fecha de cancelacion es requerida')
            .iso(),
            motivoCancelacion: Joi.string().required('El motivo de cancelacion es requerido'),
            observacion: Joi.string().required('La observacion es requerida'),
            personaCancelacion: Joi.string().required('La persona de cancelacion es requerida'),
            medioCancelacion: Joi.string().required('El medio de cancelacion es requerido')
        }
    },

    agendarCita : {
        body: Joi.object({
            sede: Joi.string().required('La sede es requerida'),
            medioSolicitud: Joi.string().required('El medio de solicitud es requerido'),
            Bprogramada: Joi.boolean().required('La cita es programada'),//todo validar que este bolleano se maneje a 1 y 0
            tipoCita: Joi.string().required('El tipo de cita es requerido'),
            idPaciente: Joi.string().regex(validarPuntoRegex).required('El id del paciente es requerido').error(handleCustomErrorsJoi),
            Ipaciente: Joi.string().regex(validarPuntoRegex).required('La ip del paciente es requerida').error(handleCustomErrorsJoi),
            fechaSolicitada: Joi.date().required('La fecha de solicitud es requerida'),
            fechaAsignada: Joi.date().required('La fecha asignada es requerida'),
            prestador: Joi.string().regex(validarPuntoRegex).required('El prestador es requerido').error(handleCustomErrorsJoi),
            especialidad: Joi.string().required('La especialidad es requerida'),
            consultorio: Joi.string().required('El consultorio es requerido'),
            administradora: Joi.string().required('La administradora es requerida'),
            tipoConsulta: Joi.string().required('El tipo de consulta es requerido'),
            fechaDeseada: Joi.date().required('La fecha deseada es requerida'),
            idTurno: Joi.string().allow('', null).optional().default(""),
            idConsultorio: Joi.string().regex(validarPuntoRegex).required('El id del consultorio es requerido').error(handleCustomErrorsJoi),
            idServicio: Joi.string().regex(validarPuntoRegex).required('El id del servicio es requerido').error(handleCustomErrorsJoi),
            usuario: Joi.string().required('El usuario es requerido'),
            idProgramaPyMS: Joi.alternatives().try(
                Joi.string().valid('', null).default(null),
                Joi.number().valid(0).default(null),
                Joi.number().valid('0').default(null),
                Joi.number()
            ).optional(),
            bProgramaPyMS:Joi.boolean().allow('', null).optional().default(false),
            idPlan: Joi.string().regex(validarPuntoRegex).required('El id del plan es requerido').error(handleCustomErrorsJoi),
            
        }).unknown(false)
    }
}