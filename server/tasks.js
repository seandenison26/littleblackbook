const 
	http = require('http'),
	DB = '127.0.0.1:5984/lbb_dev',
	dbOptions = {
		hostname:'127.0.0.1',
		port: '5984',
		path: '/lbb_dev'
	}
//desired middle ware, 
//returns http request promise
const dbRequest = (options, body = null) => {
	return new Promise((RES,rej) => {
		const req = http.request(options, (data) => {
			let rawData = '' 
			data.setEncoding('utf8')
			data.on('data', c => rawData += c)
			data.on('end',() => { 	
			console.log(JSON.parse(rawData))
			RES(rawData)
			})
			data.on('error', (e) => rej(e))	
		})
		req.on('error', (e) => rej(e))	
		req.write(body)
		req.end()
	})
}

const options = (method, headers) => {
	return Object.assign(dbOptions, {method,headers})
}	
//performs a get request to the DB and returns a JSON view
const queryDB = (url) => {
	return new Promise((res,rej) => {
		http.get(url, (view) => {
			let rawData = '' 
			view.setEncoding('utf8')
			view.on('data', c => rawData += c)
			view.on('end',() => { 	
			res(JSON.parse(rawData))
			})
			view.on('error', (e) => rej(e))	
		})
	})
}

//takes in an array, gets number of UUIDs based upon the length and adds an _id prop to each of the objs
const addUUID = (objs) => {
	var url = `http:\/\/127.0.0.1:5984/_uuids?count=${objs.length}`
	return new Promise((res,rej) => {
		queryDB(url)
			.then((ids) => {
				res(objs.map((o,i) => Object.assign(o,{"_id":ids.uuids[i]})))	
			})
			.catch(rej)		
	})
}

//get single document by ID 
const getDocByID = (id) => {
	const url = `http:\/\/${DB}/${id}`
	return new Promise((res,rej) => {
		queryDB(url)
			.then(res)
			.catch(rej)		
	})
}

//gets all userVen from user id
const getUserVen = (user) => {
	const url = `http:\/\/${DB}/_design/getVen/_view/getUserVen?key=\"${user}\"`
	return new Promise((res,rej) => {
		queryDB(url)
			.then(res)
			.catch(rej)		
	})
}

//saves a doc to the db
const saveDoc = (doc) => {
	const 
		body = JSON.stringify(doc),
		method = 'POST',
		headers = {
			'Content-Type': 'application/json',	
			'Content-Length': `${body.length}`	
		}
	return new Promise((res,rej) => {
		dbRequest(options(method,headers),body).then((data) => {
				data.ok === true ? res(doc) : rej(doc)
			})
			.catch(rej)		
	})
}

const tasks = {addUUID,getUserVen,saveDoc,getDocByID}

module.exports =  tasks
