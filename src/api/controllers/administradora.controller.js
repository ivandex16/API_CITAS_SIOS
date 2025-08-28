


class AdministradorasController {
    constructor(
        administradorasService
    ) {
        this.administradorasService = administradorasService
    }

    /*****************************************************************************
     * @function planesAdministradora
     * @Desarrollador Ivan cabeza
     * @description ejecuta el servicio que trae los planes de una administradora
     * @returns 
     *****************************************************************************/
    async planesAdministradora ( req, res, next) {
        try {
            const idAdm = req.params.idAdm
            const response = await this.administradorasService.planesAdministradora(idAdm)
            return res.status(response.status).json(response)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = AdministradorasController