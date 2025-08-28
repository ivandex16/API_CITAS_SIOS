const Joi = require('joi');
const { handleCustomErrorsJoi } = require( '../utils/functionHelpers');



module.exports = {
    listarTurnos: {
        body: Joi.object({
            idPrestador: Joi.string().allow('').optional(),
            codEspecialidad: Joi.string().required('El codigo del prestador es requerido').error(handleCustomErrorsJoi),
            sede: Joi.string().required('El id del consultorio es requerido').error(handleCustomErrorsJoi),
            fechaInicial: Joi.date().required('La fecha inicial es requerida').iso(),
            fechaFinal: Joi.date().required('La fecha final es requerida').iso()
        }).unknown(false)
    },  
}