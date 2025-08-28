const queryGetCitaByPaciente = `
        SELECT CM.Id AS IdCita , 
	    PA.Id AS IdPaciente,
	    PA.Identificacion AS  Identificacion,
        FechaAsignada,
        E.Codigo AS CodigoEspecialidad,
        E.Descrip AS Especialidad,
        P.Identificacion AS IdPrestador,
        P.Nombre AS Prestador,
        CM.Consultorio AS CodigoConsultorio,
        C.Nombre + '  ' + C.Descripcion AS Consultorio,
        CM.TipoConsulta,
        CM.TipoCita,
        RMP.IdProce AS IdServicio,
        PRO.DESCRIP AS Servicio,
        PRO.Clasificacion AS TipoServicio ,
        GC.Descripcion AS DescripcionTipoServicio
    FROM ConsultasMedicas CM
    INNER JOIN Prestadores P ON CM.Prestador = P.Identificacion
    INNER JOIN Especialidades E ON CM.Especialidad = E.Codigo
    INNER JOIN Consultorios C ON CM.Consultorio = C.Codigo
    INNER JOIN Pacientes PA ON CM.IdPaciente = PA.Identificacion
    INNER JOIN relConsMedProce RMP ON RMP.IdConsulta = CM.Id
    INNER JOIN Procedimientos PRO ON PRO.IdProcedimientos = RMP.IdProce
    INNER JOIN gclasificaciones GC ON GC.Codigo = PRO.Clasificacion AND  GC.Maestro = 'TipoProcedimiento'
    WHERE 
      CM.FechaAsignada >= GETDATE() AND
        PA.Id = :idPaciente
        AND  CM.Cancelada  IS NULL
    ORDER BY CM.FechaAsignada
`;

const procedureBuscarPaciente = `exec pa_OperacionesPacientes @OPERACION=N'BUSCAR',@Identificacion=:identificacion,@tipoId=:tipoId`;

const queryBuscarPacienteById = `SELECT CASE 
           WHEN EXISTS (
               SELECT 1
               FROM Pacientes
               WHERE Id = :idPaciente
           ) 
           THEN 1 
           ELSE 0 
       END AS Existe; `;



  const queryPacienteByIdentificacionYTipoId = `
   SELECT  P.*,
            X.IdPlan
			--X.Administradoras
    FROM Pacientes P
    OUTER APPLY (
        SELECT STRING_AGG(CAST(PLA.PlanAdm AS varchar(MAX)), '|') AS IdPlan 
        --STRING_AGG(CAST(PLA.Administradora AS varchar(MAX)), '|') AS Administradoras
        FROM relPlanPaci PLA 
        WHERE PLA.Paciente = P.Id AND PLA.Administradora = P.CodAdministradora
        -- Opcional: ordena los IDs dentro del agregado
        -- WITHIN GROUP (ORDER BY PLA.FechaVigencia DESC, PLA.Id DESC)
    ) X
    WHERE P.Identificacion = :Identificacion
      AND P.TipoID = :TipoID;
  `




  

module.exports = {
  queryGetCitaByPaciente,
  procedureBuscarPaciente,
  queryBuscarPacienteById,
  queryPacienteByIdentificacionYTipoId
};
