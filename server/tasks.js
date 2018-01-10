const http = require('http')
const DB = '127.0.0.1:5984/lbb_dev'


//desired middle ware, 

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
		http.get(url, (view) => {
			let rawData = '', ids, json
			view.setEncoding('utf8')
			view.on('data', c => rawData += c)
			view.on('end',() => { 	
			json = JSON.parse(rawData)
			res(json)
			})
		})
	})	
}

//gets all userVen from user id
const getUserVen = (user) => {
	var url = `http:\/\/${DB}/_design/getVen/_view/getUserVen?key=\"${user}\"`
	return new Promise((res,rej) => {
		http.get(url, (view) => {
			let rawData = ''
			view.setEncoding('utf8')
			view.on('data', c => rawData += c)
			view.on('end',() => { 	
			res(JSON.parse(rawData))
			})
		})

	})
}

const tasks = {addUUID,getUserVen}

module.exports =  tasks
