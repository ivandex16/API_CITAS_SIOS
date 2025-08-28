class ConsultarPacienteDTO {
    constructor({identificacion, tipoIdentificacion}= {}) {
        this.Identificacion = identificacion;
        this.TipoID = tipoIdentificacion;
    }

    static fromModel(paciente) {
        const result = new ConsultarPacienteDTO({
            identificacion: paciente.identificacion,
            tipoIdentificacion: paciente.tipoIdentificacion
        });
        return {
            Identificacion: result.Identificacion, 
            TipoID: result.TipoID
        }
    }

}

module.exports = ConsultarPacienteDTO;