const moment = require("moment");
const APIError = require("../../errors/api-error");
const { toIsoDateOnlyZ } = require("../../utils/functionHelpers");

const ISO_Z_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
const HAS_OFFSET_RE = /(Z|[+\-]\d{2}:?\d{2})$/i;

function mustIsoZ(v, name) {
  if (typeof v !== "string" || !ISO_Z_RE.test(v)) {
    throw new Error(
      `${name} debe ser ISO UTC con Z (ej: 2025-08-29T10:45:00Z)`
    );
  }
  return v;
}

// Convierte lo que venga del modelo/BD a ISO UTC con Z
// Acepta: Date, string con Z/offset, string local "YYYY-MM-DD HH:mm:ss" o "YYYY-MM-DDTHH:mm:ss"
function toIsoZFromModel(value) {
  if (!value) return "";

  // 1) Date -> ISO Z directo
  if (value instanceof Date) return value.toISOString();

  // 2) String
  if (typeof value === "string") {
    // Ya viene en ISO Z → déjalo igual
    if (ISO_Z_RE.test(value)) return value;

    // Trae offset/Z (ej. ...-05:00 o ...Z) → parsea y pasa a ISO Z
    if (HAS_OFFSET_RE.test(value)) {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? "" : d.toISOString();
    }

    // String “local” (naive). Se interpretará como HORA LOCAL del servidor (en tus logs vi -05:00)
    // y se convertirá a UTC con Z. Ajusta los formatos que uses en tu BD.
    const m = moment(
      value,
      ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DDTHH:mm:ss"],
      true
    );
    if (m.isValid()) return m.toDate().toISOString();

    // Último recurso: dejar que moment intente parsear
    const m2 = moment(value);
    return m2.isValid() ? m2.toDate().toISOString() : "";
  }

  return "";
}

class TurnosDTO {
  constructor(params) {
    this.idPrestador = (params.idPrestador ?? "").toString().trim();
    this.codEspecialidad = (params.codEspecialidad ?? "").toString().trim();
    this.sede = (params.sede ?? "").toString().trim();
    // this.fechaInicial = params.fechaInicial || '';
    // this.fechaFinal = params.fechaFinal || '';
    this.fechaInicial = mustIsoZ(params.fechaInicial, "fechaInicial");
    this.fechaFinal = mustIsoZ(params.fechaFinal, "fechaFinal");

    // Validación de rango por epoch (sin cambiar zona)
    const ini = Date.parse(this.fechaInicial);
    const fin = Date.parse(this.fechaFinal);
    if (Number.isFinite(ini) && Number.isFinite(fin) && fin < ini) {
     
      throw new APIError({
        status: 400,
        message: "El rango de fechas es inválido: la fecha final no puede ser menor que la fecha inicial",
      });
    }

    // Validar que fechaInicial no sea anterior a la fecha actual (UTC)
    const now = Date.parse( toIsoDateOnlyZ(new Date()));
    if (Number.isFinite(ini) && ini < now) {
     
      throw new APIError({
        status: 400,
        message: "El rango de fechas no puede ser anterior a la fecha actual",
      });
    }


  }

  static fromModel(params) {
    const paramsDto = {
      idPrestador: params.idPrestador,
      codEspecialidad: params.codEspecialidad,
      sede: params.sede,
      // fechaInicial: moment(params.fechaInicial).format('YYYY-MM-DDTHH:mm:ss'),
      // fechaFinal: moment(params.fechaFinal).format('YYYY-MM-DDTHH:mm:ss')
      fechaInicial: toIsoZFromModel(params.fechaInicial),
      fechaFinal: toIsoZFromModel(params.fechaFinal),
    };
    return new TurnosDTO(paramsDto);
  }


static  #normalizarHoraUTC(fechaOriginal) {
  const fecha = new Date(fechaOriginal);
  return new Date(Date.UTC(
    fecha.getUTCFullYear(),
    fecha.getUTCMonth(),
    fecha.getUTCDate(),
    0, 0, 0, 0
  )).toISOString();
} 


static fromSecondaryModel(params) {
    const paramsDto = {
      idPrestador: params.idPrestador,
      codEspecialidad: params.codEspecialidad,
      sede: params.sede,
      // fechaInicial: moment(params.fechaInicial).format('YYYY-MM-DDTHH:mm:ss'),
      // fechaFinal: moment(params.fechaFinal).format('YYYY-MM-DDTHH:mm:ss')
      fechaInicial: this.#normalizarHoraUTC(params.fechaInicial),
      fechaFinal: this.#normalizarHoraUTC(params.fechaFinal),
    };
    return new TurnosDTO(paramsDto);
  }
}

module.exports = TurnosDTO;
