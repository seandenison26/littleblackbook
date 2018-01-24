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
	var newDoc, url = `api/createDoc/` 
		
	switch (collection) {
		case "aspect": {
			newDoc = {
				author: author,
				collection: "aspect",
				season: null,
				name: name,
				invoke: "",
				compel: ""
			}
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
		}		
	}
	var req = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		    method: "POST",
		    body: JSON.stringify(newDoc)	
	}
	return new Promise((res,rej) => {
		fetch(url,req).then(response => response.json())
		.then((doc) => {
			res(doc)
		})
		.catch(console.log)

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

export const changeVenView = (ven) => {
	return {type:"CHANGE_VEN_VIEW", venView:ven}
}	

//{type:"UPDATE_VIEW_VEN", data:{Ven to be copied} }: Will create a second copy of the desired ven object to be edited by the user. How to set this up so that it can be used by ven sheet for changing to a new ven? 
export const updateVenView = (ven,key,input) => {
	let newView = ven
	const getVenObj = (obj) => {
		if(venViewFirst.indexOf(obj) > -1) {
			return obj
		}
		else if(highConcept.indexOf(obj) > -1) {
			return "highConcept"
		}
		else if(virtues.indexOf(obj) > -1) {
			return "virtues"
		}
		else if(stylePoints.indexOf(obj) > -1) {
			return "stylePoints"
		}
		else {
			return new Error('Key not found on VenObject') 
		}
	}
	let field = getVenObj(key)	
	switch(field) {
		case "virtues": {
			newView.virtues[key] = input		
			break
		}
		case "highConcept": {
			newView.highConcept[key] = input		
			break
		}
		case "stylePoints": {
			newView.stylePoints[key] = input		
			break
		}
		case Error: {
			return obj;					
			break
		}
		default: {
			newView[key] = input
		}	
	}	
	return {type:"CHANGE_VEN_VIEW", venView:newView}
}
