let express = require( 'express' );
let app = express();
let passport = require('passport');
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );
require('./passport-setup');
app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

//Different Routes
app.get('/', (req, res) => {
    res.sendFile( __dirname +'/home.html');
})

app.get('/failed', (req, res) => {
    //Authentication Failed
    res.sendFile(__dirname + '/failed.html');
})

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => {
    console.log(req.user.displayName);
    res.render(__dirname+'/index.html',{ name : req.user.displayName});
})
  
// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
      // Successful authentication, redirect.
      res.redirect('/good');
})
  
app.get('/logout', (req, res) => {
      req.session = null;
      req.logout();
      res.redirect('/');
})

app.get( '/ended', ( req, res ) => {
    res.sendFile( __dirname + '/ended.html' );
} );

io.of( '/stream' ).on( 'connection', stream );

const port = process.env.PORT||5000;
server.listen( port );