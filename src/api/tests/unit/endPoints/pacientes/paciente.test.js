const request = require("supertest");
const app = require("../../../../../index");
const { sequelize } = require("../../../../../config/sequalize");
const server = app.server;
const {
  pacienteController,
  pacienteService,
} = require("../../../../loaders/pacientes/dependencyInjector.paciente");


var createdPacienteId;
var newPaciente

beforeAll(async () => {
  try {
    await sequelize.authenticate()
  } catch (error) {
    console.error("Error al conectar la base de datos:", error)
    throw error
  }
}, 10000)
afterAll(async () => {
  try {
    await sequelize.close()// Cierra la conexión de Sequelize
    server.close()
  } catch (error) {
    console.error("Error al cerrar la conexión de Sequelize:", error)
    throw error
  }
},10000);

describe("se valida los endpoints de pacientes", () => {

  test("it should get data paciente", async () => {
    const response = await request(app)
      .get(
        "/v1/pacientes/consulta?identificacion=1000291469&tipoIdentificacion=CC"
      )
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo"
      )
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.status).toBe(200);
    const expectedProperties = [
      "Id",
      "Identificacion",
      "Carnet",
      "Nom1Afil",
      "Nom2Afil",
      "Ape1Afil",
      "Ape2Afil",
      "Profesion",
      "FechaNac",
      "Sexo",
      "DirAfil",
      "TelRes",
      "TelOfic",
      "EstadoCivil",
      "Regimen",
      "Zona",
      "TipoID",
      "Municipio",
      "UnidadEdad",
      "Responsable",
      "Acompañante",
      "TelAcomp",
      "Expedicion",
      "Historia",
      "Usuario",
      "Nivel",
      "TipoUsuario",
      "Facturarlo",
      "Activo",
      "DirCatastrofe",
      "MunicipioCatastrofe",
      "DepartamentoCatastrofe",
      "ZonaCatastrofe",
      "FechaCatastrofe",
      "FechaOp",
      "Grado",
      "Parentesco",
      "FechaAfil",
      "Pensionado",
      "FechaInsc",
      "ConsHistoria",
      "ConsEvol",
      "CA",
      "Diagnostico",
      "Multado",
      "Recibo",
      "Escolaridad",
      "Sangre",
      "Etnia",
      "Barrio",
      "FichaSisben",
      "FechaEPS",
      "TipoCabFamilia",
      "IdCabFamilia",
      "CodAdministradora",
      "GrupoPoblacional",
      "CondBenef",
      "ModalidadSubsi",
      "TipoCotizante",
      "FechaSisben",
      "FechaAfiliacionSisben",
      "Muerto",
      "OrigenMuerte",
      "FechaMuerte",
      "Control",
      "Huella",
      "TelResponsable",
      "bHuella",
      "idReligion",
      "Foto",
    ];

    expectedProperties.forEach((prop) => {
      expect(response.body.datos).toHaveProperty(prop);
    });
  },10000);

  it("should create an update paciente", async () => {
     newPaciente = {
      ape1Afil: "DOE",
      ape2Afil: "",
      codAdministradora: "10",
      email: "",
      fechaNac: "2006-08-29 00:00:00",
      identificacion: "00000000",
      nom1Afil: "JOHN",
      nom2Afil: "",
      telRes: "3235872679",
      tipoID: "CC",
      barrio: "",
      bDesplazado: false,
      bDiscapacidad: false,
      bVCArmado: false,
      dirAfil: "Sabanalarga",
      estadoCivil: "Soltero",
      estadoEmbarazo: false,
      expedicion: "Medellín - Antioquia",
      municipio: "05001",
      pais: "COL",
      regimen: "4",
      sangre: "A+",
      sexo: "I",
      tipoCotizante: "3",
      tipoUsuario: "CB",
      zona: "U",
      cA: "",
    };
try {
    const response = await request(app)
      .post("/v1/pacientes/crear")
      .send(newPaciente)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo"
      )
      .expect("Content-Type", /json/)
      .expect(200);

      console.log('createdPacienteId', response)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Paciente registrado con exito!."
    );
    createdPacienteId = response.body.datos[0].Id; // Guardar el ID para pruebas futuras
    console.log('createdPacienteId', createdPacienteId) 
  } catch (error) {
      console.error("Error al crear  paciente:", error);
  }
  try {
    const updateResponse  = await request(app)
    .put(`/v1/pacientes/editar/${createdPacienteId}`)
    .send({sexo:"M"})
    .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo"
      )
      .expect("Content-Type", /json/)
      .expect(200)

      expect(updateResponse.status).toBe(200)
      expect(updateResponse.body).toHaveProperty(
        "message",
        "Paciente actualizado correctamente."
      );

  } catch (error) {
    console.error("Error al actualizar paciente:", error);
  }

  },10000);

});


describe('errors enpoint paciente', () => {
  test('should throw a error if the new data is equal to actual data', async () => {
    console.log('createdPacienteId', createdPacienteId) 
    const response = await request(app)
      .put(`/v1/pacientes/editar/${createdPacienteId}`)
      .send({ sexo: 'M' })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo')
      .expect('Content-Type', /json/)
      .expect(409);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'El nuevo valor es igual al valor actual. No se realizaron cambios.');
  })


  test('should throw error if paciente exists', async () => {
    const response = await request(app)
    .post("/v1/pacientes/crear")
    .send(newPaciente)
    .set("Accept", "application/json")
    .set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo"
    )
    .expect("Content-Type", /json/)
    .expect(409);


    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', `El paciente ya existe en el sistema,por favor verifique 
          si existe mas de uno con la misma identificación por 
          favor consulte a la entidad pertiente que lo registro.`);

  })
})

// describe("Paciente test", () => {
//   let req, res, next;

//   beforeEach(() => {
//     // Mock para req, res, next
//     req = {
//       params: {}, // Para los parámetros de la ruta
//       body: {}, // Para el cuerpo de la solicitud
//       query: {}, // Para los parámetros de consulta
//     };
//     res = {
//       status: jest.fn().mockReturnThis(), // Para permitir llamadas encadenadas como res.status().json()
//       json: jest.fn(),
//     };
//     next = jest.fn(); // Para manejar middleware o errores
//   });

//   test("should get a paciente ", async () => {
//     req.params.identificacion = "1000291469";
//     req.params.tipoIdentificacion = "CC";
//     const mockPaciente = {
//       status: 200,
//       message: "paciente encontrado",
//       datos: {
//         Id: "1",
//         Identificacion: "1000291469",
//         Carnet: "11909",
//         Nom1Afil: "DAVID",
//         Nom2Afil: "ESTEBAN",
//         Ape1Afil: "ALVAREZ",
//         Ape2Afil: "GAMBOA",
//         Profesion: "9999",
//         FechaNac: "2001-09-29T00:00:00.000Z",
//         Sexo: "M",
//         DirAfil: "SABANALARGA",
//         TelRes: "123457",
//         TelOfic: "123",
//         EstadoCivil: "Soltero",
//         Regimen: "2",
//         Zona: "U",
//         TipoID: "CC",
//         Municipio: "08638",
//         UnidadEdad: "1",
//         Responsable: "   ",
//         Acompañante: "   ",
//         TelAcomp: "",
//         Expedicion: "SABANALARGA",
//         Historia: "",
//         Usuario: "hruiz",
//         Nivel: "1",
//         TipoUsuario: "S",
//         Facturarlo: true,
//         Activo: true,
//         DirCatastrofe: "",
//         MunicipioCatastrofe: "",
//         DepartamentoCatastrofe: "",
//         ZonaCatastrofe: "",
//         FechaCatastrofe: "1900-01-01T00:00:00.000Z",
//         FechaOp: null,
//         Grado: "",
//         Parentesco: null,
//         FechaAfil: "1900-01-01T00:00:00.000Z",
//         Pensionado: "",
//         FechaInsc: "1900-01-01T00:00:00.000Z",
//         ConsHistoria: null,
//         ConsEvol: null,
//         CA: "01",
//         Diagnostico: "",
//         Multado: false,
//         Recibo: null,
//         Escolaridad: "",
//         Sangre: "",
//         Etnia: "",
//         Barrio: "",
//         FichaSisben: "",
//         FechaEPS: "1900-01-01T00:00:00.000Z",
//         TipoCabFamilia: "1",
//         IdCabFamilia: null,
//         CodAdministradora: "",
//         GrupoPoblacional: null,
//         CondBenef: null,
//         ModalidadSubsi: "ST",
//         TipoCotizante: null,
//         FechaSisben: null,
//         FechaAfiliacionSisben: null,
//         Muerto: null,
//         OrigenMuerte: null,
//         FechaMuerte: null,
//         Control: null,
//         Huella: null,
//         TelResponsable: "",
//         bHuella: null,
//         idReligion: 0,
//         Foto: "",
//       },
//     };
  
//     jest
//       .spyOn(pacienteService, "consultarPorIdentificacionYtipoId")
//       .mockResolvedValue(mockPaciente);
//     await pacienteController.consultarPaciente(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockPaciente);
//   });

  

//   test("should return a error messsage if paciente already exist", async () => {
//     const mockPacienteExist = {
//       Identificacion: "00000000", 
//       Nom1Afil: "JOHN" 
    
//     }

//    jest.spyOn(pacienteService.pacienteReposistory, "consultarPaciente").mockResolvedValue(true)
   
   
//     req.body = {
//       ape1Afil: "DOE",
//       ape2Afil: "",
//       codAdministradora: "10",
//       email: "",
//       fechaNac: "2006-08-29 00:00:00",
//       identificacion: "00000000",
//       nom1Afil: "JOHN",
//       nom2Afil: "",
//       telRes: "3235872679",
//       tipoID: "CC",
//       barrio: "",
//       bDesplazado: false,
//       bDiscapacidad: false,
//       bVCArmado: false,
//       dirAfil: "Sabanalarga",
//       estadoCivil: "Soltero",
//       estadoEmbarazo: false,
//       expedicion: "Medellín - Antioquia",
//       municipio: "05001",
//       pais: "COL",
//       regimen: "4",
//       sangre: "A+",
//       sexo: "I",
//       tipoCotizante: "3",
//       tipoUsuario: "CB",
//       zona: "U",
//       cA: "",
//     };

//     await pacienteController.crearPaciente(req, res, next);
//     console.log("next",next);

//     expect(next).toHaveBeenCalledWith(expect.objectContaining({
//       status: 409,
//       message: "El paciente ya existe en el sistema, por favor verifique",
//     }));
  
//   })

//   test("should created a paciente", async () => {
//     req.body = {
//       ape1Afil: "DOE",
//       ape2Afil: "",
//       codAdministradora: "10",
//       email: "",
//       fechaNac: "2006-08-29 00:00:00",
//       identificacion: "00000000",
//       nom1Afil: "JOHN",
//       nom2Afil: "",
//       telRes: "3235872679",
//       tipoID: "CC",
//       barrio: "",
//       bDesplazado: false,
//       bDiscapacidad: false,
//       bVCArmado: false,
//       dirAfil: "Sabanalarga",
//       estadoCivil: "Soltero",
//       estadoEmbarazo: false,
//       expedicion: "Medellín - Antioquia",
//       municipio: "05001",
//       pais: "COL",
//       regimen: "4",
//       sangre: "A+",
//       sexo: "I",
//       tipoCotizante: "3",
//       tipoUsuario: "CB",
//       zona: "U",
//       cA: "",
//     };
//     const mockPaciente = {
//       status: 201,
//       message: "Paciente registrado con exito!.",
//       datos: [
//         {
//           Resultado: null,
//           Id: "56896",
//           FechaUltActualizacion: "02/09/2024",
//           HoraUltActualizacion: "16:57",
//         },
//       ],
//     };

//     jest.spyOn(pacienteService, "createPaciente").mockResolvedValue(mockPaciente);
//     await pacienteController.crearPaciente(req, res, next);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(mockPaciente);
//   });
// });


/*
beforeEach(() => {
  // Mock para req, res, next
  req = {
    params: {}, // Para los parámetros de la ruta
    body: {}, // Para el cuerpo de la solicitud
    query: {}, // Para los parámetros de consulta
  };
  res = {
    status: jest.fn().mockReturnThis(), // Para permitir llamadas encadenadas como res.status().json()
    json: jest.fn(),
  };
  next = jest.fn(); // Para manejar middleware o errores
});

afterEach(() => {
  jest.clearAllMocks();
});


describe('consultar paciente', () => {
  test("should get a paciente ", async () => {
    req.params.identificacion = "1000291469";
    req.params.tipoIdentificacion = "CC";
    const mockPaciente = {
      status: 200,
      message: "paciente encontrado",
      datos: {
        Id: "1",
        Identificacion: "1000291469",
        Carnet: "11909",
        Nom1Afil: "DAVID",
        Nom2Afil: "ESTEBAN",
        Ape1Afil: "ALVAREZ",
        Ape2Afil: "GAMBOA",
        Profesion: "9999",
        FechaNac: "2001-09-29T00:00:00.000Z",
        Sexo: "M",
        DirAfil: "SABANALARGA",
        TelRes: "123457",
        TelOfic: "123",
        EstadoCivil: "Soltero",
        Regimen: "2",
        Zona: "U",
        TipoID: "CC",
        Municipio: "08638",
        UnidadEdad: "1",
        Responsable: "   ",
        Acompañante: "   ",
        TelAcomp: "",
        Expedicion: "SABANALARGA",
        Historia: "",
        Usuario: "hruiz",
        Nivel: "1",
        TipoUsuario: "S",
        Facturarlo: true,
        Activo: true,
        DirCatastrofe: "",
        MunicipioCatastrofe: "",
        DepartamentoCatastrofe: "",
        ZonaCatastrofe: "",
        FechaCatastrofe: "1900-01-01T00:00:00.000Z",
        FechaOp: null,
        Grado: "",
        Parentesco: null,
        FechaAfil: "1900-01-01T00:00:00.000Z",
        Pensionado: "",
        FechaInsc: "1900-01-01T00:00:00.000Z",
        ConsHistoria: null,
        ConsEvol: null,
        CA: "01",
        Diagnostico: "",
        Multado: false,
        Recibo: null,
        Escolaridad: "",
        Sangre: "",
        Etnia: "",
        Barrio: "",
        FichaSisben: "",
        FechaEPS: "1900-01-01T00:00:00.000Z",
        TipoCabFamilia: "1",
        IdCabFamilia: null,
        CodAdministradora: "",
        GrupoPoblacional: null,
        CondBenef: null,
        ModalidadSubsi: "ST",
        TipoCotizante: null,
        FechaSisben: null,
        FechaAfiliacionSisben: null,
        Muerto: null,
        OrigenMuerte: null,
        FechaMuerte: null,
        Control: null,
        Huella: null,
        TelResponsable: "",
        bHuella: null,
        idReligion: 0,
        Foto: "",
      },
    };
  
    jest
      .spyOn(pacienteService, "consultarPorIdentificacionYtipoId")
      .mockResolvedValue(mockPaciente);
    await pacienteController.consultarPaciente(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPaciente);
  });

})


describe('Crear un paciente', () => {
  test("should return a error messsage if paciente already exist", async () => {
    const mockPacienteExist = {
      Identificacion: "00000000", 
      Nom1Afil: "JOHN" 
    
    }

   jest.spyOn(pacienteService.pacienteReposistory, "consultarPaciente").mockResolvedValue(true)
   
   
    req.body = {
      ape1Afil: "DOE",
      ape2Afil: "",
      codAdministradora: "10",
      email: "",
      fechaNac: "2006-08-29 00:00:00",
      identificacion: "00000000",
      nom1Afil: "JOHN",
      nom2Afil: "",
      telRes: "3235872679",
      tipoID: "CC",
      barrio: "",
      bDesplazado: false,
      bDiscapacidad: false,
      bVCArmado: false,
      dirAfil: "Sabanalarga",
      estadoCivil: "Soltero",
      estadoEmbarazo: false,
      expedicion: "Medellín - Antioquia",
      municipio: "05001",
      pais: "COL",
      regimen: "4",
      sangre: "A+",
      sexo: "I",
      tipoCotizante: "3",
      tipoUsuario: "CB",
      zona: "U",
      cA: "",
    };

    await pacienteController.crearPaciente(req, res, next);
    console.log("next",res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 409,
      message: `El paciente ya existe en el sistema,por favor verifique 
          si existe mas de uno con la misma identificación por 
          favor consulte a la entidad pertiente que lo registro.`,
    }));
  
  })




  test("should created a paciente", async () => {
    req.body = {
      ape1Afil: "DOE",
      ape2Afil: "",
      codAdministradora: "10",
      email: "",
      fechaNac: "2006-08-29 00:00:00",
      identificacion: "00000000",
      nom1Afil: "JOHN",
      nom2Afil: "",
      telRes: "3235872679",
      tipoID: "CC",
      barrio: "",
      bDesplazado: false,
      bDiscapacidad: false,
      bVCArmado: false,
      dirAfil: "Sabanalarga",
      estadoCivil: "Soltero",
      estadoEmbarazo: false,
      expedicion: "Medellín - Antioquia",
      municipio: "05001",
      pais: "COL",
      regimen: "4",
      sangre: "A+",
      sexo: "I",
      tipoCotizante: "3",
      tipoUsuario: "CB",
      zona: "U",
      cA: "",
    };
    const mockPaciente = {
      status: 201,
      message: "Paciente registrado con exito!.",
      datos: [
        {
          Resultado: null,
          Id: "56896",
          FechaUltActualizacion: "02/09/2024",
          HoraUltActualizacion: "16:57",
        },
      ],
    };

    jest.spyOn(pacienteService, "createPaciente").mockResolvedValue(mockPaciente);
    await pacienteController.crearPaciente(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPaciente);
  });


})



describe('Actualizar un paciente', () => {
  
  test('should update a paciente', async () => {
    const mockPacienteUpdate = {
      status: 200,
      message: "Paciente actualizado correctamente.",
    };
    jest.spyOn(pacienteService, "updatePaciente").mockResolvedValue(mockPacienteUpdate);
    req.body = {
      telRes: '123456'
    };
    req.params.id = 1;

    await pacienteController.actualizarPaciente(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPacienteUpdate);
  });

  test('should return an error message if paciente not found', async () => {
    const mockPacienteUpdate = {
      status: 404,
      message: "El paciente que intenta actualizar no se encuntra registrado, por favor verifique!.",
    };
    jest.spyOn(pacienteService, "updatePaciente").mockResolvedValue(mockPacienteUpdate);
    req.body = {
      telRes: '123456'
    };
    req.params.id = 1;

    await pacienteController.actualizarPaciente(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(mockPacienteUpdate);
  });

  test('should throw an error if the new data is equal to actual data', async () => {
    const id = 1;
    const pacienteExistente = {
      Id: "1",
      Identificacion: "1000291469",
      Carnet: "11909",
      Nom1Afil: "DAVID",
      Nom2Afil: "ESTEBAN",
      Ape1Afil: "ALVAREZ",
      Ape2Afil: "GAMBOA",
      Profesion: "9999",
      FechaNac: "2001-09-29T00:00:00.000Z",
      Sexo: "M",
      DirAfil: "SABANALARGA",
      TelRes: "123457",
      TelOfic: "123",
      EstadoCivil: "Soltero",
      Regimen: "2",
      Zona: "U",
      TipoID: "CC",
      Municipio: "08638",
      UnidadEdad: "1",
      Responsable: "   ",
    };

    const newDataPaciente = {
      telRes: '123457'
    };

    req.params.id = id;
    req.body = newDataPaciente;

    // Mock para el repositorio
    jest.spyOn(pacienteService.pacienteReposistory, "getElementById").mockResolvedValue(pacienteExistente);
    const updateMock = jest.spyOn(pacienteService.pacienteReposistory, 'update').mockResolvedValue([0]);

    try {
      await pacienteController.actualizarPaciente(req, res, next);
    } catch (error) {
      console.error('Error capturado:', error.message);
      expect(error.message).toBe("El nuevo valor es igual al valor actual. No se realizaron cambios.");
      expect(error.status).toBe(409);  // Código de estado adecuado
    }

    console.log('Calls to getElementById:', pacienteService.pacienteReposistory.getElementById.mock.calls);
    console.log('Results of update:', pacienteService.pacienteReposistory.update.mock.results);

    expect(updateMock).not.toHaveBeenCalled();
  });
});
*/
