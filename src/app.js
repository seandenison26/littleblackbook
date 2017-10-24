import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import reducer from "./reducer"
import VenSheet from "./VenSheet/VenSheet"


const state = {
	player: "Sean",
	ven: [{virtues: {
		"strength": "2",
		"cunning": "3",
		"courage": "W",
		"beauty": "4",
		"wisdom": "2",
		"prowess": "4"
	},
	highConcept: {
		house :"Fox", 
		familyName: "Nege", 
		publicName: "Orlando",
	       	publicMeaning: "The Herald of Duty",	
		secretName: "Orfeo", 
		age: "Spring",
	        family: {},
		title: "Count",
		agepoints: "34"
	}
	}],
	venView: {virtues: {
			"strength": "2",
			"cunning": "3",
			"courage": "W",
			"beauty": "4",
			"wisdom": "2",
			"prowess": "4"
	},
		highConcept: {
		house :"Fox", 
		familyName: "Nege", 
		publicName: "Orlando",
	       	publicMeaning: "The Herald of Duty",	
		secretName: "Orfeo", 
		age: "Spring",
	        family: {},
		title: "Count",
		agepoints: "34"
		}
	}
}



const store = createStore(reducer,state);


const dispatchAction = (action) => {
	store.dispatch(action)
}

const util = {
	dispatchAction: dispatchAction
}


//store.subscribe(()=> console.log(store.getState()))
store.subscribe(() => {ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))})


const App = ({data,util}) => {
	const searchVen = () => {
		let newName = document.getElementById("searchBtn").value
		util.dispatchAction({type:"CHANGE_PUB_NAME", name:newName})
	}
	const onInput = (e) => {
		document.getElementById(e.target.id).value = e.target.value
	}

	return  <div id="characterView">
			<input id="searchBtn" type="text" onChange={onInput} /><button onClick={searchVen}>Search</button>
			<VenSheet ven={data.venView} dispatchAction={dispatchAction}/>
		</div>


}

ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))

  
  
