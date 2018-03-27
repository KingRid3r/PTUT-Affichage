// Dirige vers la bonne vue

exports.index = function(req, res) {
	var page = true;
	res.render('index');
};

exports.edition = function(req, res) {
	var page = true;
	res.render('edition');
}

exports.afficheur = function(req, res) {
	var page = true;
	res.render('afficheur');
}

exports.newelement = function(req, res) {
	var page = true;
	res.render('newelement');
}


exports.scene1 = function(req, res) {
	var page = true;
	res.render('scene1');
}

exports.scene2 = function(req, res) {
	var page = true;
	res.render('scene2');
}

exports.scenes = function(req, res) {
	var page = true;
	res.render('scenes');
}

