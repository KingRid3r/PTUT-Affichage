// Modules dépendances
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	fs = require('fs'),
	uid = require('rand-token').uid,
	io = require('socket.io').listen(server);

let rawdata = fs.readFileSync('elements.json');  
let elements = JSON.parse(rawdata);
console.log(elements);

//Routes
var routes = require('./routes'),
	user = require('./routes/user');

// Environnements Express
app.set('port', process.env.PORT || 3000)
.set('views', __dirname + '/views')
.set('view engine', 'ejs')
.use(express.favicon())
.use(express.logger('dev'))
.use(express.bodyParser())
.use(express.methodOverride())
.use(app.router)
.use(express.static(path.join(__dirname, 'public')));

// Développement uniquement
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index)
.get('/edition', routes.edition)
.get('/newelement', routes.newelement)
.get('/users', user.list)
.get('/afficheur', routes.afficheur)
.get('/scene', routes.scene)
.get('/scene1', routes.scene1)
.get('/scene2', routes.scene2)

.use(function(req, res, next) {
	if (typeof page == 'undefined') res.redirect('/');
});


server.listen(app.get('port'), function() {
	console.log('Le serveur est connectee sur le port ' + app.get('port'));
});



io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {

        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});