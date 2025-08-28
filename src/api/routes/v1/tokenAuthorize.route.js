const express = require( 'express' );
const jwt = require( 'jwt-simple' );
const router = express.Router();
const { myJwtSecret  } = require( '../../../config/vars')
const validate = require("express-validation");
const { tokenAuthorize } = require('../../middlewares/tokenAuthorize');



router
    .route( '/authorization' )
    /**
     * @api {get} v1/token/api/authenticate Get Token
     * @apiDescription Get token
     * @apiVersion 1.0.0
     * @apiName GetToken
     * @apiGroup Token
     * @apiPermission public
     * 
     */
        .get(  ( req, res ) => {
            const payload = {
                company: 'sysnet',
                
            };
            const secret = myJwtSecret;
            const token = jwt.encode( payload , secret, 'HS256' );
            res.json( { token: token } );
        })

    module.exports = router;

