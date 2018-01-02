import React from "react"
import {updateVenView} from "../actions.js"
import "./VenSheet.css"
/*	Components Needed
 *		VenSheet 
 *			 > Relics, Rituals, Artifacts
 */

const SaveButton = ({saveVen}) => {
	return <button onclick={save}></button>
}

const VenHeader = ({ven}) => {
	return	<h1 id="venheader">{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</h1> 
}


//Should we eventually have these be tied to an array? When creating a new character we want them to pick form the right array, which initially will be the one form the book but eventually let DMs offer a custom array?
const VirtueBar = ({virtues,VenViewInputChange}) => {
	const VirtueTabs = Object.keys(virtues).map(v => {return <li>{v.toUpperCase()}: <select key={`${v}`} id={`${v}`} onChange={VenViewInputChange} defaultValue={virtues[v]}>
												<option value="W">W</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
											</select></li>})
	return  <div id="virtuebar">
			{VirtueTabs}
		</div>		
}
/*
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
*/
const HighConcept = ({highConcept,VenViewInputChange}) => {
	return 	<div id="highConceptTab">
			<h2>High Concept</h2>	
			<p>House: <input id="house" type="text" onChange={VenViewInputChange} value={highConcept.house} /></p>				
			<p>Family Name: <input id="familyName" type="text" onChange={VenViewInputChange} value={highConcept.familyName} /></p>				
			<p>Public Name: <input id="publicName" type="text" onChange={VenViewInputChange} value={highConcept.publicName} /></p>				
			<p>Public Meaning: <input id="publicMeaning" onChange={VenViewInputChange} value={highConcept.publicMeaning} /></p>				
			<p>Secret Name: <input id="secretName" type="text" onChange={VenViewInputChange} value={highConcept.secretName} /></p>				
			<p>Age: <input id="age" type="text" onChange={VenViewInputChange} value={highConcept.age} /></p>				
			<p>Family: <input id="family" onChange={VenViewInputChange} type="text" value={highConcept.family} /></p>				
			<p>Title: <input id="title" onChange={VenViewInputChange} value={highConcept.title} /></p>				
			<p>Age Points: <input id="agepoints" onChange={VenViewInputChange} value={highConcept.agepoints} /></p>				
		</div>	
}	

//New Aspect Button?
//Treat Aspects like Twitter? I/T/C cap out at 140 chars?
const Aspects = ({aspects}) => {
	const AspectTab = ({aspect}) => {
		return 	<div className="aspect">
				<h2>{aspect.name}</h2>
				<p>Ivoke: {aspect.invoke}</p>
				<p>Tag: {aspect.tag}</p>
				<p>Compel: {aspect.compel}</p>
			</div>
	}

	return 	<div id="aspectTabs">
			{AspectTabs}
		</div>	
}	

const Devotions = ({devotions}) => {
	
}	

const Contacts = ({contacts}) => {
	
}	
const Friends = ({friends}) => {
	
}	
const Style = ({style}) => {
	
}	
const Manuevers = ({manuevers}) => {
	
}	
const Extras = ({extras}) => {
	
}	
const Domain = ({domain}) => {
	
}	
const Guff = ({guff}) => {
	
}	
export default function VenSheet({ven, dispatchAction}) {

	const VenViewInputChange = (e) => {
	let
	       	change = e.target.id,
	       	input = e.target.value
		dispatchAction(updateVenView(ven,change,input))
	}
	return	<div id="venSheet">
			<VenHeader ven={ven}/>
			<VirtueBar virtues={ven.virtues} VenViewInputChange={VenViewInputChange}/>	
			<HighConcept highConcept={ven.highConcept} VenViewInputChange={VenViewInputChange}/>	
		</div>
}	
