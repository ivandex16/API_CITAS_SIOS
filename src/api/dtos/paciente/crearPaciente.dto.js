class CrearPacienteDTO {
    constructor({
      id = '',
      identificacion = '',
      carnet = '',
      nom1Afil = '',
      nom2Afil = '',
      ape1Afil = '',
      ape2Afil = '',
      profesion = '',
      fechaNac = '',
      sexo = '',
      dirAfil = '',
      telRes = '',
      telOfic = '',
      estadoCivil = '',
      regimen = '',
      zona = '',
      tipoID = '',
      municipio = '',
      unidadEdad = '',
      responsable = '',
      acompanante = '',
      ape1Acompanante = '',
      ape2Acompanante = '',
      identificacionAcom = '',
      tipoIdAcompanante = '',
      nom1Acompanante = '',
      nom2Acompanante = '',
      parentescoAcompanante = '',
      dirAcompanante = '',
      telAcomp = '',
      celularAcompanante = '',
      expedicion = '',
      historia = '',
      usuario = '',
      nivel = '',
      tipoUsuario = '',
      facturarlo = '',
      activo = 1,
      dirCatastrofe = '',
      municipioCatastrofe = '',
      departamentoCatastrofe = '',
      zonaCatastrofe = '',
      fechaCatastrofe = '',
      fechaOp = '',
      grado = '',
      parentesco = '',
      fechaAfil = '',
      pensionado = '',
      fechaInsc = '',
      consHistoria = '',
      consEvol = '',
      ca = '',
      diagnostico = '',
      multado = 0,
      recibo = '',
      escolaridad = '',
      sangre = '',
      etnia = '',
      bVCArmado = 0,
      bDiscapacidad = 0,
      bDesplazado = 0,
      barrio = '',
      fichaSisben = '',
      fechaEPS = '',
      tipoCabFamilia = '',
      idCabFamilia = '',
      codAdministradora = '',
      idPlan = '',
      grupoPoblacional = '',
      condBenef = '',
      modalidadSubsi = '',
      tipoCotizante = '',
      fechaSisben = '',
      fechaAfiliacionSisben = '',
      muerto = 'false',
      origenMuerte = '',
      fechaMuerte = '',
      control = '',
      huella = '',
      telResponsable = '',
      bHuella = '',
      idReligion = '',
      foto = null,
      email = '',
      telCel = '',
      certiDefuncion = '',
      referencia = '',
      identificacionAcompanante = '',
      identificacionResponsable = '',
      tipoIdResponsable = '',
      parentescoResponsable = '',
      dirResponsable = '',
      creencia = '',
      nombreResponsable = '',
      estadoEmbarazo = 0,
      raza = '',
      referenciaDireccion = '',
      firma = '',
      localidad = '',
      celularResponsable = '',
      nom1Responsable = '',
      nom2Responsable = '',
      ape1Responsable = '',
      ape2Responsable = '',
      pais = '',
      fechaUltActualizacion = ''
    } = {}) {
    
      this.id = id;
      this.identificacion = identificacion;
      this.carnet = carnet;
      this.nom1Afil = nom1Afil;
      this.nom2Afil = nom2Afil;
      this.ape1Afil = ape1Afil;
      this.ape2Afil = ape2Afil;
      this.profesion = profesion;
      this.fechaNac = fechaNac;
      this.sexo = sexo;
      this.dirAfil = dirAfil;
      this.telRes = telRes;
      this.telOfic = telOfic;
      this.estadoCivil = estadoCivil;
      this.regimen = regimen;
      this.zona = zona;
      this.tipoID = tipoID;
      this.municipio = municipio;
      this.unidadEdad = unidadEdad;
      this.responsable = responsable;
      this.acompanante = acompanante;
      this.ape1Acompanante = ape1Acompanante;
      this.ape2Acompanante = ape2Acompanante;
      this.identificacionAcom = identificacionAcom;
      this.tipoIdAcompanante = tipoIdAcompanante;
      this.nom1Acompanante = nom1Acompanante;
      this.nom2Acompanante = nom2Acompanante;
      this.parentescoAcompanante = parentescoAcompanante;
      this.dirAcompanante = dirAcompanante;
      this.telAcomp = telAcomp;
      this.celularAcompanante = celularAcompanante;
      this.expedicion = expedicion;
      this.historia = historia;
      this.usuario = usuario;
      this.nivel = nivel;
      this.tipoUsuario = tipoUsuario;
      this.facturarlo = facturarlo;
      this.activo = activo;
      this.dirCatastrofe = dirCatastrofe;
      this.municipioCatastrofe = municipioCatastrofe;
      this.departamentoCatastrofe = departamentoCatastrofe;
      this.zonaCatastrofe = zonaCatastrofe;
      this.fechaCatastrofe = fechaCatastrofe;
      this.fechaOp = fechaOp;
      this.grado = grado;
      this.parentesco = parentesco;
      this.fechaAfil = fechaAfil;
      this.pensionado = pensionado;
      this.fechaInsc = fechaInsc;
      this.consHistoria = consHistoria;
      this.consEvol = consEvol;
      this.ca = ca;
      this.diagnostico = diagnostico;
      this.multado = multado;
      this.recibo = recibo;
      this.escolaridad = escolaridad;
      this.sangre = sangre;
      this.etnia = etnia;
      this.bVCArmado = bVCArmado;
      this.bDiscapacidad = bDiscapacidad;
      this.bDesplazado = bDesplazado;
      this.barrio = barrio;
      this.fichaSisben = fichaSisben;
      this.fechaEPS = fechaEPS;
      this.tipoCabFamilia = tipoCabFamilia;
      this.idCabFamilia = idCabFamilia;
      this.codAdministradora = codAdministradora;
      this.idPlan = idPlan;
      this.grupoPoblacional = grupoPoblacional;
      this.condBenef = condBenef;
      this.modalidadSubsi = modalidadSubsi;
      this.tipoCotizante = tipoCotizante;
      this.fechaSisben = fechaSisben;
      this.fechaAfiliacionSisben = fechaAfiliacionSisben;
      this.muerto = muerto;
      this.origenMuerte = origenMuerte;
      this.fechaMuerte = fechaMuerte;
      this.control = control;
      this.huella = huella;
      this.telResponsable = telResponsable;
      this.bHuella = bHuella;
      this.idReligion = idReligion;
      this.foto = foto;
      this.email = email;
      this.telCel = telCel;
      this.certiDefuncion = certiDefuncion;
      this.referencia = referencia;
      this.identificacionAcompanante = identificacionAcompanante;
      this.identificacionResponsable = identificacionResponsable;
      this.tipoIdResponsable = tipoIdResponsable;
      this.parentescoResponsable = parentescoResponsable;
      this.dirResponsable = dirResponsable;
      this.creencia = creencia;
      this.nombreResponsable = nombreResponsable;
      this.estadoEmbarazo = estadoEmbarazo;
      this.raza = raza;
      this.referenciaDireccion = referenciaDireccion;
      this.firma = firma;
      this.localidad = localidad;
      this.celularResponsable = celularResponsable;
      this.nom1Responsable = nom1Responsable;
      this.nom2Responsable = nom2Responsable;
      this.ape1Responsable = ape1Responsable;
      this.ape2Responsable = ape2Responsable;
      this.pais = pais;
      this.fechaUltActualizacion = fechaUltActualizacion;
    }


    static fromModel(data) {
        return new CrearPacienteDTO({
          id: data.id ,
          identificacion: data.identificacion,
          carnet: data.carnet,
          nom1Afil: data.nom1Afil,
          nom2Afil: data.nom2Afil,
          ape1Afil: data.ape1Afil,
          ape2Afil: data.ape2Afil,
          profesion: data.profesion,
          fechaNac: data.fechaNac,
          sexo: data.sexo,
          dirAfil: data.dirAfil,
          telRes: data.telRes,
          telOfic: data.telOfic,
          estadoCivil: data.estadoCivil,
          regimen: data.regimen,
          zona: data.zona,
          tipoID: data.tipoID,
          municipio: data.municipio,
          unidadEdad: data.unidadEdad,
          responsable: data.responsable,
          acompanante: data.acompanante,
          ape1Acompanante: data.ape1Acompanante,
          ape2Acompanante: data.ape2Acompanante,
          identificacionAcom: data.identificacionAcom,
          tipoIdAcompanante: data.tipoIdAcompanante,
          nom1Acompanante: data.nom1Acompanante,
          nom2Acompanante: data.nom2Acompanante,
          parentescoAcompanante: data.parentescoAcompanante,
          dirAcompanante: data.dirAcompanante,
          telAcomp: data.telAcomp,
          celularAcompanante: data.celularAcompanante,
          expedicion: data.expedicion,
          historia: data.historia,
          usuario: data.usuario,
          nivel: data.nivel,
          tipoUsuario: data.tipoUsuario,
          facturarlo: data.facturarlo,
          activo: data.activo,
          dirCatastrofe: data.dirCatastrofe,
          municipioCatastrofe: data.municipioCatastrofe,
          departamentoCatastrofe: data.departamentoCatastrofe,
          zonaCatastrofe: data.zonaCatastrofe,
          fechaCatastrofe: data.fechaCatastrofe,
          fechaOp: data.fechaOp,
          grado: data.grado,
          parentesco: data.parentesco,
          fechaAfil: data.fechaAfil,
          pensionado: data.pensionado,
          fechaInsc: data.fechaInsc,
          consHistoria: data.consHistoria,
          consEvol: data.consEvol,
          ca: data.ca,
          diagnostico: data.diagnostico,
          multado: data.multado,
          recibo: data.recibo,
          escolaridad: data.escolaridad,
          sangre: data.sangre,
          etnia: data.etnia,
          bVCArmado: data.bVCArmado,
          bDiscapacidad: data.bDiscapacidad,
          bDesplazado: data.bDesplazado,
          barrio: data.barrio,
          fichaSisben: data.fichaSisben,
          fechaEPS: data.fechaEPS,
          tipoCabFamilia: data.tipoCabFamilia,
          idCabFamilia: data.idCabFamilia,
          codAdministradora: data.codAdministradora,
          idPlan: data.idPlan,
          grupoPoblacional: data.grupoPoblacional,
          condBenef: data.condBenef,
          modalidadSubsi: data.modalidadSubsi,
          tipoCotizante: data.tipoCotizante,
          fechaSisben: data.fechaSisben,
          fechaAfiliacionSisben: data.fechaAfiliacionSisben,
          muerto: data.muerto,
          origenMuerte: data.origenMuerte,
          fechaMuerte: data.fechaMuerte,
          control: data.control,
          huella: data.huella,
          telResponsable: data.telResponsable,
          bHuella: data.bHuella,
          idReligion: data.idReligion,
          foto: data.foto,
          email: data.email,
          telCel: data.telCel,
          certiDefuncion: data.certiDefuncion,
          referencia: data.referencia,
          identificacionAcompanante: data.identificacionAcompanante,
          tipoIdAcompanante: data.tipoIdAcompanante,
          identificacionResponsable: data.identificacionResponsable,
          tipoIdResponsable: data.tipoIdResponsable,
          parentescoResponsable: data.parentescoResponsable,
          dirResponsable: data.dirResponsable,
          creencia: data.creencia,
          nombreResponsable: data.nombreResponsable,
          estadoEmbarazo: data.estadoEmbarazo,
          raza: data.raza,
          referenciaDireccion: data.referenciaDireccion,
          firma: data.firma,
          localidad: data.localidad,
          celularResponsable: data.celularResponsable,
          nom1Responsable: data.nom1Responsable,
          nom2Responsable: data.nom2Responsable,
          ape1Responsable: data.ape1Responsable,
          ape2Responsable: data.ape2Responsable,
          pais: data.pais,
          fechaUltActualizacion: data.fechaUltActualizacion
        });
    }
  }

  module.exports = CrearPacienteDTO;
  