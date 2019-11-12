const express = require( "express" );
const multer = require( "multer" );
const router = express.Router();
const path = require( "path" );

const upload = multer({
    storage : multer.diskStorage({
        destination( req, file, done ){
            done( null, "uploads" );
        },

        filename( req, file, done ){
            // const ext = path.extname( file.originalname );  // 확장자
            const ext = ".jpg";
            const basename = path.basename( file.originalname, ext );
            const filename = basename + Date.now() + ext;
            done( null, filename );
        }
    })
})

router.post( "/images", upload.array( "image" ), ( req, res ) => {
    res.json( req.files.map( v => v.filename ));
});

module.exports = router;