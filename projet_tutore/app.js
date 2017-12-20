// Modules dépendances
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	fs = require('fs'),
	io = require('socket.io')(server);

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

.use(function(req, res, next) {
	if (typeof page == 'undefined') res.redirect('/');
});

io.sockets.on('connection', function(socket) {
	//
	socket.on('message', function(message) {
		socket.emit('message', message);
	})
})


server.listen(app.get('port'), function() {
	console.log('Le serveur est connectee sur le port ' + app.get('port'));
});
