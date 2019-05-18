let express     = require( 'express' );
let serv_app    = express();
let path        = require( 'path' );

serv_app.get( '/', function( req, res ) {
    let abs_path = path.join( __dirname, 'public/index.html' );
    res.sendFile( abs_path );
});

module.exports = {
    start: function() {
        serv_app.listen( 8080 );
    }
}