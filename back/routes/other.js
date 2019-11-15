

const express = require( "express" );
const db = require( "../models" );
const router = express.Router();

router.get( "/:id", async ( req, res, next ) => {
    try{
        const other = await db.User.findOne({
            where : {
                id : req.params.id,
            }
        });

        res.json( other );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

module.exports = router;