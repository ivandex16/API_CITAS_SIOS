function calcularTurnosPorBloques(datos, citasAsignadas) {
  const resultado = {};

  const citasSet = new Set(
    citasAsignadas.map((cita) => {
      const dt = new Date(cita.FechaAsignada);
      const fecha = dt.toISOString().split("T")[0];
      const hora = `${String(dt.getUTCHours()).padStart(2, '0')}:${String(dt.getUTCMinutes()).padStart(2, '0')}`;
      const resultado = cita.Prestador ? `${fecha} ${hora}|${cita.Prestador}` : `${fecha} ${hora}`;
      return resultado
    })
  );

console.log('citasAsignadas', citasAsignadas)

  const now = new Date();
  const hoyStr = now.toISOString().split("T")[0];
  const minutosAhora = now.getHours() * 60 + now.getMinutes();

  datos.forEach((bloque) => {
    const {
      HoraIni,
      HoraFin,
      Duracion,
      Fecha,
      Prestador,
      Especialidad,
      Id,
      PuestoAtencion,
      idConsultorio,
      Codigo_consultorio
    } = bloque;

    // Convertimos la fecha a string (solo la parte de día)
    const fechaStr = new Date(Fecha).toISOString().split("T")[0];

    // Convertimos horas a minutos
    const [hIni, mIni] = HoraIni.split(":").map(Number);
    const [hFin, mFin] = HoraFin.split(":").map(Number);
    const minutosInicio = hIni * 60 + mIni;
    const minutosFin = hFin * 60 + mFin;

    let turnoInicio = minutosInicio;
    const turnos = [];

    while (turnoInicio + Duracion <= minutosFin) {
      const turnoFin = turnoInicio + Duracion;

      const horaInicio = `${String(Math.floor(turnoInicio / 60)).padStart(
        2,
        "0"
      )}:${String(turnoInicio % 60).padStart(2, "0")}`;

      const horaFin = `${String(Math.floor(turnoFin / 60)).padStart(
        2,
        "0"
      )}:${String(turnoFin % 60).padStart(2, "0")}`;

      const idPrestador = String(Prestador);
       

       //en la consulta original que busca las citas asignadas, cuando se filtra por prestador , no viene el dato de prestador
      //asi que filtramos sin el dato del prestador , solo con fecha y hora oara no mostrar esos turnos
      // en caso que se filtre solo por especialidad , se agrega el prestador para filtrar ya que vienen varios prestadores
       prestadorExistInConsultaCitasAsignadas = citasAsignadas.some(cita => cita.Prestador === idPrestador)
      const claveTurno = prestadorExistInConsultaCitasAsignadas ?`${fechaStr} ${horaInicio}|${idPrestador}` : `${fechaStr} ${horaInicio}`;


      // FILTRO: excluir si fecha es pasada
      if (fechaStr < hoyStr) {
        turnoInicio += Duracion;
        continue;
      }


       // FILTRO: si es hoy, y la horaInicio es anterior a ahora
       if (fechaStr === hoyStr && turnoInicio < minutosAhora) {
        turnoInicio += Duracion;
        continue;
      }

      if (!citasSet.has(claveTurno)) {
        turnos.push({
          Id,
          horaInicio,
          horaFin,
          Prestador,
          Especialidad,
          PuestoAtencion,
          idConsultorio,
          Codigo_consultorio,
          Fecha
        });
      }

      // turnos.push({ horaInicio, horaFin ,Prestador, Especialidad});

      turnoInicio += Duracion;
    }

    // Si ya existen turnos para esa fecha, agregamos
    if (turnos.length > 0) {
        if (!resultado[fechaStr]) {
          resultado[fechaStr] = [];
        }
        resultado[fechaStr].push(...turnos);
      }
    });

  return resultado;
}

module.exports = {
  calcularTurnosPorBloques,
};

// function calcularTurnosPorBloques(datos, citasAsignadas) {                 // Define la función principal que recibe bloques/turnos posibles (datos) y las citas ya asignadas.

//   const toYMD = (d) =>                                                     // Utilidad: formatea un Date a 'YYYY-MM-DD' en hora local.
//     `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

//   const toHM = (mins) =>                                                   // Utilidad: convierte minutos (desde 00:00) a 'HH:mm'.
//     `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

//   const normPrestador = (v) => (v === null || v === undefined ? '' : String(v).trim()); // Normaliza el prestador a string sin espacios extremos; si viene null/undefined -> ''.

//   // --- Normalizamos si el dataset de citas trae columna Prestador ---
//   const hasPrestadorDim = citasAsignadas.some((c) => normPrestador(c.Prestador) !== ''); // Detecta si en citas hay al menos un Prestador no vacío; decide si la “dimensión prestador” existe.

//   // --- Construimos el set de citas ocupadas con una clave CONSISTENTE ---
//   const citasSet = new Set(                                                // Creamos un Set para búsqueda O(1) de turnos ya ocupados.
//     citasAsignadas.map((cita) => {                                         // Recorremos cada cita asignada para construir su clave.
//       const dt = new Date(cita.FechaAsignada);                             // Parseamos la fecha/hora asignada (asumimos hora local de negocio).
//       const fecha = toYMD(dt);                                             // Formateamos la fecha a 'YYYY-MM-DD' local.
//       const hora = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`; // Sacamos HH:mm local.
//       const prest = normPrestador(cita.Prestador);                         // Normalizamos el prestador (string o '').
//       return hasPrestadorDim ? `${fecha} ${hora}|${prest}` : `${fecha} ${hora}`; // Si hay dimensión prestador, la incluimos SIEMPRE en la clave; si no, solo fecha+hora.
//     })
//   );

//   const now = new Date();                                                  // Tomamos la “hora actual” local del sistema.
//   const hoyStr = toYMD(now);                                               // Guardamos la fecha de hoy en 'YYYY-MM-DD'.
//   const minutosAhora = now.getHours() * 60 + now.getMinutes();             // Minutos transcurridos hoy (para comparar horas de turnos).

//   const resultado = {};                                                    // Acumulará turnos disponibles agrupados por fecha (clave: 'YYYY-MM-DD').

//   for (const bloque of datos) {                                            // Iteramos cada bloque de disponibilidad (franja horaria).
//     const {                                                                // Desestructuramos las propiedades que necesitamos del bloque.
//       HoraIni, HoraFin, Duracion, Fecha,
//       Prestador, Especialidad, Id,
//       PuestoAtencion, idConsultorio, Codigo_consultorio
//     } = bloque;

//     // Guardas defensivas
//     if (!HoraIni || !HoraFin || !Duracion || Duracion <= 0) continue;     // Si faltan datos básicos o duración no válida, saltamos el bloque.

//     const fechaBloque = new Date(Fecha);                                   // Creamos Date con la fecha del bloque (día de atención).
//     const fechaStr = toYMD(fechaBloque);                                   // Normalizamos la fecha del bloque a 'YYYY-MM-DD' local.

//     // Pasado: descarta todo el bloque
//     if (fechaStr < hoyStr) continue;                                       // Si la fecha del bloque ya pasó, no generamos turnos (optimización).

//     const [hIni, mIni] = HoraIni.split(':').map(Number);                   // Parseamos hora de inicio 'HH:mm' a números.
//     const [hFin, mFin] = HoraFin.split(':').map(Number);                   // Parseamos hora de fin 'HH:mm' a números.
//     const minutosInicio = hIni * 60 + mIni;                                // Convertimos inicio a minutos desde 00:00.
//     const minutosFin = hFin * 60 + mFin;                                   // Convertimos fin a minutos desde 00:00.
//     if (minutosInicio >= minutosFin) continue;                             // Si el rango es inválido (inicio >= fin), saltamos el bloque.

//     let turnoInicio = minutosInicio;                                       // Cursor en minutos para ir generando turnos.
//     const turnos = [];                                                     // Acumula los turnos libres que vamos a exponer de este bloque.
//     const prestKey = normPrestador(Prestador);                             // Normalizamos el prestador del bloque para construir claves.

//     while (turnoInicio + Duracion <= minutosFin) {                         // Generamos turnos “cerrados” [inicio, inicio+Duracion] dentro de la franja.
//       // Si es hoy, evita horas pasadas
//       if (fechaStr === hoyStr && turnoInicio < minutosAhora) {             // Si el turno es hoy y ya pasó la hora de inicio, se salta.
//         turnoInicio += Duracion;                                           // Avanzamos al siguiente turno.
//         continue;                                                          // Continuamos el while.
//       }

//       const horaInicio = toHM(turnoInicio);                                // Formateamos inicio a 'HH:mm'.
//       const horaFin = toHM(turnoInicio + Duracion);                        // Formateamos fin a 'HH:mm'.

//       // Clave estable: si el dataset tiene dimensión Prestador, SIEMPRE la incluimos
//       const claveTurno = hasPrestadorDim                                   // Construimos la clave de colisión con misma regla que en citasSet.
//         ? `${fechaStr} ${horaInicio}|${prestKey}`
//         : `${fechaStr} ${horaInicio}`;

//       if (!citasSet.has(claveTurno)) {                                     // Si este turno NO está ocupado…
//         turnos.push({                                                       // …lo agregamos como disponible con metadatos útiles.
//           Id,
//           horaInicio,
//           horaFin,
//           Prestador,
//           Especialidad,
//           PuestoAtencion,
//           idConsultorio,
//           Codigo_consultorio,
//           Fecha
//         });
//       }

//       turnoInicio += Duracion;                                             // Avanzamos el cursor a la siguiente ranura.
//     }

//     if (turnos.length) {                                                   // Si se generaron turnos disponibles en este bloque…
//       if (!resultado[fechaStr]) resultado[fechaStr] = [];                  // Aseguramos array para esa fecha en el resultado.
//       resultado[fechaStr].push(...turnos);                                 // Añadimos todos los turnos calculados para esa fecha.
//     }
//   }

//   return resultado;                                                        // Devolvemos un objeto: { 'YYYY-MM-DD': [turnosDisponibles...] }.
// }

// module.exports = { calcularTurnosPorBloques };                              // Exportamos la función para usarla desde otros módulos.
