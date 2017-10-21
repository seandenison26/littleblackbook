import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import reducer from "./reducer"

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

/*	Components Needed
 *		VenSheet > VenHeader 
 *			 > VirtureBar
 *			 > HighConcept
 *			 > Aspects
 *			 > Devotions
 *			 > Contacts
 *			 > Friends
 *			 > StylePoints > Points, Gear, Banked
 *			 > Manuevers
 *			 > Extras
 *			 > Domain > ProvinceView, TotalResources > Resources, Regions, Vassals
 *			 > Relics, Rituals, Artifacts
 * 
 */

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

const VenSheet = ({ven}) => {
	return	<div id="venSheet">
			<h1>{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</h1> 
			
		</div>
}


ReactDOM.render(<App data={store.getState()} store={store}/>, document.getElementById('app'))

  
  
