//Reducer File 

export default function reducer(state = {}, action = {}) {
	var newState = Object.assign(state, {})

	switch(action.type) {
		case "CHANGE_PUB_NAME": {
			newState.highConcept = Object.assign(newState.highConcept, {publicName:action.name})
			return newState
		}	

		default: {
			return newState
		} 
	}
}
