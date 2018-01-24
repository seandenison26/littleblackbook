//creates dependencies
const 
	path = require('path'),
	express = require('express'),
	tasks = require('./tasks')

//creates router
var router = express.Router();

var rootDir = __dirname + '/../' 

//routes the react app
router.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

//returns an array of the users ven from the db, call backmiddle ware will probablly authticate, or build an object, get uuid is probablly a good one as well
router.get('/api/getUserVen/:user/', (req, res) => {
	let user = req.params.user
	tasks.getUserVen(user)
		.then((data) => {
			console.log(data)
			res.send(data)
		})
		.catch((err) => res.send(new Error ("User has no Ven.")));
});

router.post('/api/getUUIDs', (req, res) => {
	tasks.addUUID(req.body)
		.then((data) => {
			res.send(req.body)
		})
		.catch((err) => res.send(err));
});

router.post('/api/createDoc', (req, res) => {
	tasks.addUUID(req.body)
		.then(tasks.saveDoc)
		.then((docs) => {
			res.send(req.body)
		})
		.catch((err) => res.send(err));
});
//exports the router
module.exports = router; 

