      const usp_queryProgramasAplicablesPorPaciente = ` exec Citas.usp_ProgramasAplicaPaciente @sIdPaciente=:Ipaciente, @CodigoProc=N'',@CodigoPlan=:codigoPlan`;


       let queryConsultaProgramaPaciente = (atrs) => objectQueryString ={
        select: "PR.Descrip, CodigoPrograma ",
        from: `dbo.relProgramasPacientes RPP
                            INNER JOIN dbo.Programas PR ON PR.Codigo = RPP.CodigoPrograma
                            INNER JOIN dbo.Pacientes PA ON PA.Id = RPP.IdPaciente`,

        where: `RPP.Asociado = 1 
                            AND RPP.IdPaciente = ${atrs?.Ipaciente}
                            AND PR.Codigo = ${atrs?.idProgramaPyMS}
                            AND PR.Activo = 1`,
      };



      module.exports = {
        usp_queryProgramasAplicablesPorPaciente,
        queryConsultaProgramaPaciente,
      }