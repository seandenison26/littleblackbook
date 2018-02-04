const 
	http = require('http'),
	DB = '127.0.0.1:5984/lbb_dev',
	dbOptions = {
		hostname:'127.0.0.1',
		port: '5984',
		path: '/lbb_dev',
		auth: `Basic ${new Buffer.from('lbbDev:secret').toString('base64')}`
	}
//desired middle ware, 
//returns http request promise
const dbRequest = (options, body = null) => {
	console.log(`Req:${JSON.stringify(options)}`)
	return new Promise((res,rej) => {
		const req = http.request(options, (data) => {
			console.log(options)
			let rawData = '' 
			data.setEncoding('utf8')
			data.on('data', c => rawData += c)
			data.on('end',() => { 	
			res(JSON.parse(rawData))
			console.log(rawData)
			})
			data.on('error', (e) => rej(e))	
		})
		req.on('error', (e) => rej(e))	
		req.write(body)
		req.end()
	})
}

const reqOptions = (method, headers, path = dbOptions.path) => {
	let
       		newOptions = JSON.parse(JSON.stringify(dbOptions))	
		h = Object.assign(headers,{"Authorization":newOptions.auth})
	return Object.assign(newOptions, {method,headers:h,path:newOptions.path + path})
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
			view.on('error', (e) => {console.log(`$QUERY ERROR {e}`), rej(e)})	
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
				console.log(url)
	return new Promise((res,rej) => {
		queryDB(url)
			.then((doc) =>  {
				console.log(doc)
				res(doc)
			}
			)
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
const createDoc = (doc) => {
	const 
		body = JSON.stringify(doc),
		method = 'POST',
		headers = {
			'Content-Type': 'application/json',	
			'Content-Length': `${body.length}`	
		}
	return new Promise((res,rej) => {
		dbRequest(reqOptions(method,headers),body)
			.then((data) => {
				data.ok === true ? res(Object.assign(doc,{_rev:data.rev})) : rej(new Error(data))
			})
			.catch((err) => { console.log('Save Err'), rej(err)})		
	})
}

//updates a doc based on _id and _rev 
const updateDoc = (doc) => {
	const
       		path = `/${doc._id}/`	
		body = JSON.stringify(doc),
		method = 'PUT',
		headers = {
			'Content-Type': 'application/json',	
			'Content-Length': `${body.length}`	
		}
	return new Promise((res,rej) => {
		dbRequest(reqOptions(method,headers,path),body)
			.then((data) => {
				data.ok === true ? res(Object.assign(doc,{_rev:data.rev})) : rej(data)
			})
			.catch((err) => { console.log('Update Err'), rej(err)})		
	})
}
const tasks = {addUUID,getUserVen,createDoc,updateDoc,getDocByID}

module.exports =  tasks
