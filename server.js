let express     = require( 'express' );
let serv_app    = express();
let path        = require( 'path' );
let http        = require( 'http' ).createServer( serv_app );
let io          = require( 'socket.io' )( http );

serv_app.get( '/:unique_editor', function( req, res ) {
    let abs_path = path.join( __dirname, 'public/index.html' );
    
    io.on('connection', function(socket) {
        console.log( "a user connected" );

        socket.broadcast.emit("check-unique-editor", {url: req.params.unique_editor});

        socket.on('set-delta', function(delta) {
            console.log(delta);
            io.sockets.emit("get-delta", delta);
        });
    });

    io.on("found-unique-editor", function(data) {
        data.s.broadcast.emit("init-editor", data.l);
    });

    res.sendFile( abs_path );
});


module.exports = {
    start: function() {
        http.listen( 3030, function() {
            console.log( "Listening to *3030" );
        });
    }
}
