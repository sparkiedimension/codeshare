let express     = require( 'express' );
let serv_app    = express();
let path        = require( 'path' );
let http        = require( 'http' ).createServer( serv_app );
let io          = require( 'socket.io' )( http );

serv_app.get( '/', function( req, res ) {
    let abs_path = path.join( __dirname, 'public/index.html' );
    res.sendFile( abs_path );
});

io.on( 'connection', function( socket ) {
    console.log( "a user connected" ); 
   
    socket.on( 'disconnect', function() {
        console.log( "user disconnect" );
    });
});

module.exports = {
    start: function() {
        http.listen( 3030, function() {
            console.log( "Listening to *3030" );
        });
    }
}
