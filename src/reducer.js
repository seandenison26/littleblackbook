//Reducer File 

export default function reducer(state = {}, action = {}) {
	
	var newState = Object.assign(state, {})
		
	console.log(newState)


	switch(action.type) {
		case "CHANGE_PUB_NAME": {
			newState.venView.highConcept = Object.assign(newState.venView.highConcept, {publicName:action.name})

			return newState
		}
		case "CHANGE_VEN_VIEW": {
			newState.venView = Object.assign(newState.venView, action.venView)
			return newState
		}	
		default: {
			return newState
		} 
	}
}
