

class ProgramaPyMSDto {
    constructor(params) {
        this.Ipaciente = params.Ipaciente
        this.idProgramaPyMS = params.idProgramaPyMS
        this.bProgramaPyMS = params.bProgramaPyMS
    }


    static fromModel(params) {
       const  paramsDto = {
            Ipaciente: params.Ipaciente,
            idProgramaPyMS: params.idProgramaPyMS,
            bProgramaPyMS: params.bProgramaPyMS
        }

        return new ProgramaPyMSDto(paramsDto)
    }
}

module.exports = ProgramaPyMSDto