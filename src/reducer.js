//Reducer File 

export default function reducer(state = {}, action = {}) {
	var newState = Object.assign(state, {})

	switch(action.type) {
		case "CHANGE_PUB_NAME": {
			newState.highConcept = Object.assign(newState.highConcept, {publicName:action.name})
			return newState
		}
		case "CHANGE_VEN_VIEW_INPUT": {
			newState.vewView = Object.assign(newState, action.venView)
			return newState
		}
		case "SAVE_VEN": {
			
		}	
		default: {
			return newState
		} 
	}
}
