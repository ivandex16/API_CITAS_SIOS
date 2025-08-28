const Joi = require('joi');
const { handleCustomErrorsJoi } = require( '../utils/functionHelpers');



module.exports = {
    listarPrestadores: {
        params: Joi.object({
            codEspecialidad: Joi.string().required('El codigo del prestador es requerido').error(handleCustomErrorsJoi),
          
        }).unknown(false)
    },  
}