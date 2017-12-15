
// Modules dépendances
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	io = require('socket.io')(server);

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

.use(function(req, res, next) {
	if (typeof page == 'undefined') res.redirect('/');
});

io.sockets.on('connection', function(socket) {
	//
})



server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
