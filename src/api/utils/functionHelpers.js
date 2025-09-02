const _ = require("lodash");
const { error } = require("winston");



/**
 * Asigna el valor de la propiedad vacía ("") de un objeto a una nueva propiedad con el nombre especificado,
 * elimina la propiedad vacía y retorna el objeto actualizado.
 *
 * @param {Object} obj - El objeto al que se le reasignará la propiedad.
 * @param {string} name - El nuevo nombre para la propiedad cuyo valor será transferido.
 * @returns {Object} El objeto original con la propiedad renombrada.
 */
function assingNameToObjectProp(obj, name) {
  let newObject = {};
  newObject[name] = obj[""];
  delete obj[""];
  return _.assign(obj, newObject);
}

/**
 * 
 * @param {*} errors 
 * @param {*} customMessages 
 * @returns 
 */
function customErrorMessages(errors, customMessages) {
  errors.forEach((err) => {
    if (customMessages[err.type]) {
      err.message = customMessages[err.type];
    }
  });
   return errors;
}

/**
 * 
 * @param {*} date 
 * @returns 
 */
function dateSinZonaHorariaToString(date) {
  console.log('fecha', date)
   const fechaSinZonaHoraria =
   date.toISOString().split("T")[0] +
  " " +
  date.toTimeString().split(" ")[0];
  return fechaSinZonaHoraria
}


/**
 * @function capitalizePropertyNames
 * @description Capitaliza los nombres de las propiedades de un objeto
 * @param {*} obj 
 * @returns 
 */
function capitalizePropertyNames(obj) {
  let newObj = {};
  for (let key in obj) {
      let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObj[capitalizedKey] = obj[key];
  }
  return newObj;
}


const groupByProperty = (array, property) => {
  return array.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const handleCustomErrorsJoi = (errors) => {
  return errors.map(err => {
    switch(err.type){
        case 'string.regex.base':
            err.message = `El valor de ${err.context.key}:"${err.context.value}" no debe contener puntos.`;
            break;
        default:
            break;
    }
    return err;
})
}

/***
 * @function
 * @description Obtiene información sobre el llamador de una función
 * @returns {String} Información sobre el llamador en el formato "archivo.js:linea:columna"
 * @example
 * const callerInfo = getCallerInfo();
 */
const getCallerInfo = () => {
  const obj = {};
  Error.captureStackTrace(obj, getCallerInfo);
  const stack = obj.stack.split('\n');
  
  // Ajusta el índice según sea necesario
  const caller = stack.find(line => !line.includes('node_modules') && line.includes('at')).trim();
  const match = caller.match(/\((.*):(\d+):(\d+)\)/) || caller.match(/at\s+(.*):(\d+):(\d+)/);
  
  if (match) {
    const filePath = match[1] || match[2];
    const lineNumber = match[2] || match[3];
    return `${filePath}:${lineNumber}`;
  }
  return 'unknown';

}


function validarPropiedadesObjeto(objeto) {
  const objetoValido = _.every(_.values(objeto), val => val !== null && val !== undefined && val !== '');
  return objetoValido;
}

function omitProperties(objeto, propiedades) {
  return _.omit(objeto, propiedades);
}


function toIsoDateOnlyZ(value) {
  if (!value) return "";
  const fecha = new Date(value);
  if (isNaN(fecha.getTime())) return "";
  // Devuelve solo la fecha en formato ISO con Z y hora 00:00:00
  return new Date(Date.UTC(
    fecha.getUTCFullYear(),
    fecha.getUTCMonth(),
    fecha.getUTCDate(),
    0, 0, 0, 0
  )).toISOString();
}


/**
 * Limpia espacios adelante y atrás en todas las propiedades tipo string
 * dentro de un objeto agrupado por fecha.
 * @param {Object} datos - Objeto con arrays por fecha
 * @returns {Object} - Objeto limpio
 */
function limpiarEspacios(datos) {
  const resultado = {};

  for (const fecha in datos) {
    resultado[fecha] = datos[fecha].map((registro) => {
      const limpio = {};

      for (const clave in registro) {
        const valor = registro[clave];

        // Si es string, aplicar trim
        limpio[clave] = typeof valor === 'string' ? valor.trim() : valor;
      }

      return limpio;
    });
  }

  return resultado;
}


module.exports = {
  assingNameToObjectProp,
  customErrorMessages,
  dateSinZonaHorariaToString,
  capitalizePropertyNames,
  groupByProperty,
  handleCustomErrorsJoi,
  getCallerInfo,
  validarPropiedadesObjeto,
  omitProperties,
  toIsoDateOnlyZ,
  limpiarEspacios
};
