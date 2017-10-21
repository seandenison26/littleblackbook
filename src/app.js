import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
//import * as reducer from "./reducer"

const state = {
	ven: "Orlando"
}

/*
	const reducer = (state, action) => {
	var newState = Object.assign(state, {})

	switch(action) {
		

		default: {
			return newState
		} 
	}
}
const store = createStore(reducer, state);
*/




const App = ({data}) => {
	return  <div id="window">
			<VenSheet ven={data}/>
		</div>


}

const VenSheet = ({ven}) => {
	return	<h1>{ven.ven}</h1>
}


ReactDOM.render(<App data={state}/>, document.getElementById('app'))

  
  
