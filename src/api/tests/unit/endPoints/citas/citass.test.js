const request = require("supertest");
const app = require("../../../../../index");
const { sequelize } = require("../../../../../config/sequalize");
const server = app.server;

var idCita;

beforeAll(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
    throw error;
  }
}, 10000);
afterAll(async () => {
  try {
    await sequelize.close(); // Cierra la conexión de Sequelize
    server.close();
  } catch (error) {
    console.error("Error al cerrar la conexión de Sequelize:", error);
    throw error;
  }
}, 10000);

describe("se valida los endpoinst de citas", () => {
  const newCita = {
    sede: "01",
    medioSolicitud: "MSC02",
    Bprogramada: true,
    tipoCita: "TC09",
    idPaciente: "1000291469",
    Ipaciente: "1",
    fechaSolicitada: "2024-09-03 00:00:00",
    fechaAsignada: "2024-09-06 00:17:00",
    prestador: "8642941",
    especialidad: "900",
    consultorio: "c01",
    administradora: "25",
    tipoConsulta: "CMG01",
    fechaDeseada: "2024-09-03 00:00:00",
    idTurno: "",
    idConsultorio: "1010",
    idServicio: "05074",
    usuario: "COCO",
  };
  test("should return a new cita", async () => {
    try {
      const response = await request(server)
        .post("/v1/citas/agendar")
        .send(newCita)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo"
        )
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Cita creada con exito");

      const expectedProperties = ["Consultorio", "idCita"];

      idCita = response.body.datos[0].idCita;
      expectedProperties.forEach((prop) => {
        expect(response.body.datos[0]).toHaveProperty(prop);
      });
    } catch (error) {
      console.error("Error en la creacion de la cita :", error);
      throw error;
    }
  }, 10000);

  test("it should cancel an appointment", async () => {
    const citaCancelar = {
      idCita: idCita,
      fechaCancelacion: new Date(),
      motivoCancelacion: "MC01",
      observacion: "NO PUDO ASISTIR",
      personaCancelacion: "kelly",
      medioCancelacion: "MSC02",
    };
    try {
      const response = await request(server)
        .delete("/v1/citas/cancelar")
        .send(citaCancelar)
        .set("Accept", "application/json")
        .set(
          "Authorization",
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55Ijoic3lzbmV0In0.At7hqQXE7MgiC4FVv_gUVZr8ECZ9JntVumUYCWhQzwo"
        )
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Cita cancelada"
      );
    } catch (error) {
      console.error("Error en la cancelacion de la cita :", error);
      throw error;
    }
  }, 10000);
});

// const {
//   citasController,
//   citaService,
// } = require("../../../../loaders/citas/dependencyInjector.cita");

// beforeEach(() => {
//   // Mock para req, res, next
//   req = {
//     params: {}, // Para los parámetros de la ruta
//     body: {}, // Para el cuerpo de la solicitud
//     query: {}, // Para los parámetros de consulta
//   };
//   res = {
//     status: jest.fn().mockReturnThis(), // Para permitir llamadas encadenadas como res.status().json()
//     json: jest.fn(),
//   };
//   next = jest.fn(); // Para manejar middleware o errores
// });

// describe("agendamiento de una cita", () => {
//   test("should schedul a cita", async () => {
//     const mockCita = {
//       status: 200,
//       message: "Cita creada con exito",
//       datos: [
//         {
//           Consultorio: "Consultorio 1",
//           idCita: 1,
//         },
//       ],
//     };

//     req.body = {
//       sede: "01",
//       medioSolicitud: "MSC02",
//       Bprogramada: true,
//       tipoCita: "TC09",
//       idPaciente: "1000291469",
//       Ipaciente: "1",
//       fechaSolicitada: "2024-09-03 00:00:00",
//       fechaAsignada: "2024-09-04 10:15:00",
//       prestador: "8642941",
//       especialidad: "900",
//       consultorio: "c01",
//       administradora: "25",
//       tipoConsulta: "CMG01",
//       fechaDeseada: "2024-09-03 00:00:00",
//       idTurno: "",
//       idConsultorio: "1010",
//       idServicio: "05074",
//       usuario: "COCO",
//     };

//     jest.spyOn(citaService, "agendarCitaService").mockResolvedValue(mockCita);
//     await citasController.agendarCita(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockCita);
//   });

//   describe("cancelar una cita", () => {
//     test("should cancel a cita", async () => {
//       const mockCita = {
//         status: 200,
//         message: "Cita cancelada",
//       };

//       req.body = {
//         idCita: "26208",
//         fechaCancelacion: "2024-05-28T00:00:00",
//         motivoCancelacion: "MC01",
//         observacion: "NO PUDO ASISTIR",
//         personaCancelacion: "kelly",
//         medioCancelacion: "MSC02",
//       };

//       jest.spyOn(citaService, "cancelarCita").mockResolvedValue(mockCita);
//       await citasController.cancelarCita(req, res, next);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith(mockCita);
//     });
//   });
// });
