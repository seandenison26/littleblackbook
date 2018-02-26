import * as R from 'ramda'
//Needed Constants
	const 
		virtues = ["strength","cunning","courage","beauty","wisdom","prowess"],
		highConcept = ["house","familyName","publicName","secretName","age","family","title","agepoints"],
		stylePoints = ["points","gear","banked"],
		venViewFirst = ["newAspectName","player","devotions","aspects","contacts","friends","manuevers","extras", "domain","relics","rituals","artifacts"]
//Actions to be created 

//Utility functions
const returnsJSON = (data) => {
		return new Promise((res,rej) => {
			return res.json(data)
	})
}

export const createDoc = (collection, author = null, name) => {
	let newDoc, url = `api/createDoc/` 
	switch (collection) {

		case "aspects": {
			newDoc = {
				author: author,
				collection: "aspect",
				season: null,
				name: name,
				invoke: "",
				tag: "",
				compel: ""
			}
			break
		}
		case "ven": {
			newDoc = {
				author: author,
				collection: "ven",
				highConcept:{
					publicName:name
				},
				aspects: []
			}
			break
		}		
	}
	let req = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		    method: "POST",
		    body: JSON.stringify(newDoc)	
	}
	console.log(newDoc)
	return new Promise((res,rej) => {
		fetch(url,req).then(response => response.json())
		.then(res)
	})	
}

//API call to server to update a specific document
export const updateDoc = (doc) => {
	let newDoc, url = `api/updateDoc/` 
	let req = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "PUT",
		body: JSON.stringify(doc)	
	}	
	return new Promise((res,rej) => {
		fetch(url,req).then(response => response.json())
		.then(res)
	})
}
//Helper OBject, createVenObject, creates a blank VenView to be filled in.
const createVenObject = (ven = {}) => {
	return  {
		"id" : "",
		"player": "",
		"virtues": {
			"strength": "",
			"cunning": "",
			"courage": "",
			"beauty": "",
			"wisdom": "",
			"prowess": ""
		},
		"highConcept": {
			"house" :"", 
			"familyName": "", 
			"publicName": "", 
			"secretName": "", 
			"age": "",
			"family": "",
			"title": "",
			"agepoints": ""
		},
		"devotions": [],
		"aspects": [],
		"contacts": [],
		"friends": [],
		"stylePoints": {
			"points": 0,
			"gear": [],
			"banked": 0
		},
		"manuevers": [],
		"extras": [],
		"domain": [{
			"province": {
				"resources": [],
				"regions": [],
				"vassals": [] 
			}
		}],
		"relics": [],
		"rituals": [],
		"aritfacts": []
	}
}

export const getUserVen = (user) => {
	var url = `api/getUserVen/${user}` 
	
	return new Promise((res,rej) => {
		fetch(url) .then(response => response.json())
		.then((ven) => {
			res({type:"CHANGE_VEN", ven:ven.rows.map(v => v.value)})
		})
		.catch(console.log)

	})	
}

//changes the VenView state object
export const changeVenView = (newView) => {
	return {type:"CHANGE_VEN_VIEW", venView:newView}
}	

//{type:"UPDATE_VIEW_VEN", data:{Ven to be copied} }: Will create a second copy of the desired ven object to be edited by the user. How to set this up so that it can be used by ven sheet for changing to a new ven? 
export const saveVenView = (ven,key,input) => {
	let newView = ven
	return {type:"CHANGE_VEN_VIEW", venView:newView}
}

