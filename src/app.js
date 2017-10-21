import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import reducer from "./reducer"
import VenSheet from "./VenSheet/VenSheet"

const state = {
	player: "Sean",
	virtues: {
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



const store = createStore(reducer,state);


//store.subscribe(()=> console.log(store.getState()))
store.subscribe(() => {ReactDOM.render(<App data={store.getState()} store={store}/>, document.getElementById('app'))})


const App = ({data,store}) => {
	const searchVen = () => {
		let newName = document.getElementById("searchBtn").value
		store.dispatch({type:"CHANGE_PUB_NAME", name:newName})
	}
	const onInput = (e) => {
		document.getElementById("searchBtn").value = e.target.value
	}

	return  <div id="characterView">
			<input id="searchBtn" type="text" onChange={onInput} /><button onClick={searchVen}>Search</button>
			<VenSheet ven={data}/>
		</div>


}

ReactDOM.render(<App data={store.getState()} store={store}/>, document.getElementById('app'))

  
  
