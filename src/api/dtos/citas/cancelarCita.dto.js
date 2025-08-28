const moment = require("moment");
class CancelarCitaDTO {
    constructor(params) {
        this.idCita = params.idCita;
        this.fechaCancelacion = params.fechaCancelacion;
        this.motivoCancelacion = params.motivoCancelacion;
        this.observacion = params.observacion;
        this.personaCancelacion = params.personaCancelacion;
        this.medioCancelacion = params.medioCancelacion;
    }


    static fromModel(params) {
        return new CancelarCitaDTO({
            idCita: params.idCita,
            fechaCancelacion: moment(params.fechaCancelacion).format('YYYY-MM-DDTHH:mm:ss'),
            motivoCancelacion: params.motivoCancelacion,
            observacion: params.observacion,
            personaCancelacion: params.personaCancelacion,
            medioCancelacion: params.medioCancelacion
        });
    }

}

module.exports = CancelarCitaDTO;