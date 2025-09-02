    const queryConsultarCitas = `exec paConsultasCitas @Consulta=N'EspPrest',@Dato=N'',@Extra2=default,@Equipo=default`;


    const procedureAgendarCita = (citaDto,programaPyMS) => `exec paInsCitas @Localidad=:sede,@MedioSolicitud=:medioSolicitud,
      @Programada=:Bprogramada,@TipoCita=:tipoCita,@IdPaciente=:idPaciente,
      @FechaSolicitada=:fechaSolicitada,@FechaAsignada=:fechaAsignada,
      @Prestador=:prestador,@Especialidad=:especialidad,@Consultorio=:consultorio,
      @Adm=:idPlan,@Autorizacion=N'',@TipoConsulta=:tipoConsulta,@Ciclo=N'1',
      @Cantidad=N'1',@Paciente=:Ipaciente,@Observacion=N'',@IdTurno=${citaDto.idTurno},@idConsultorio=:idConsultorio,
      @xmlProcedimientos=N'<Procedimientos><row IdProcedimiento="${citaDto.idServicio}"  IdProgramaPyMS="${programaPyMS.idProgramaPyMS}" />
      </Procedimientos>',@FechaDeseada=:fechaDeseada,@bProgramaPyMS=:bProgramaPyMS,@sAsignadaFecha=N'FA001',@sUsuarioRegistro=:usuario`;




      const queryConsultarCitaCancelada = `SELECT Cancelada  FROM ConsultasMedicas WHERE Id = :idCita`;



       const procedureCancelarCita = `exec paCancelacionCitas @Id=:idCita,@Cancelada=1,
                          @FechaCancelacion=:fechaCancelacion,@MotivoCancelacion=:motivoCancelacion,
                          @ObservacionCancelacion=:observacion,@PersonaCancelacion=:personaCancelacion,
                          @MedioCancelacion=:medioCancelacion`;



     const procedureObtenerTurnosPrestadores = `
    exec [Citas].[usp_ObtenerTurnosPrestadores] @sPrestador=:prestador,@sEspecialidad=:especialidad,@sIdSede=:sede,@fFechaInicial=:fechaAsignada,
    @fFechaFinal=:fechaAsignada`;


    module.exports = {
        queryConsultarCitas,
        procedureAgendarCita,
        queryConsultarCitaCancelada,
        procedureCancelarCita,
        procedureObtenerTurnosPrestadores
        };