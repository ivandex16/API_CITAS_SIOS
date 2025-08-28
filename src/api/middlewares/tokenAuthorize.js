const jwt = require("jwt-simple");
const { myJwtSecret } = require("../../config/vars");
const httpStatus = require("http-status");
const ApiError = require("../errors/api-error");


/**
 * valida el token  del cliente para que pueda acceder a las rutas
 * desarrollador: Ivan cabeza
 * @public
 */
exports.tokenAuthorize = async function (req, res, next) {
  const errorApi = new ApiError({
    status: httpStatus.UNAUTHORIZED,
    message: "Unauthorized",
  });

  try {
    if (!req.headers.authorization) {
      next(errorApi);
    }
    const token = req.headers.authorization.split(" ")[1];
    const secret = myJwtSecret;
    const payload = await jwt.decode(token, secret);
    if (!payload) {
      next(errorApi);
    }
    req.client = payload;
    next();
    
  } catch (error) {
    console.log("errorToken", error);
    next(error);
  }
};
