import React from "react"
import "./VenSheet.css"
/*	Components Needed
 *		VenSheet 
 *			 > Relics, Rituals, Artifacts
 */

const SaveButton = ({props}) => {
	return <button onclick={props.save}></button>
}

const VenHeader = ({ven}) => {
	return	<h1 id="venheader">{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</h1> 
}

const VirtueBar = ({virtues}) => {
	
	const changeVir = (e) => {
		document.getElementById(e.target.id).value = e.target.value
	}

	const VirtueTabs = Object.keys(virtues).map(v => {return <li>{v.toUpperCase()}: <select key={`${v}`} id={`${v}tab`} onChange={changeVir} value={virtues[v]}>
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
const HighConcept = ({highConcept}) => {
	return 	<div id="highConceptTab">
			<p>House: <input>{highConcept.house}</input></p>				
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
export default function VenSheet({ven}) {

	const VenViewInputChange = (e) => {
	let change = e.target.id


	
	}



	return	<div id="venSheet">
			<VenHeader ven={ven}/>
			<VirtueBar virtues={ven.virtues}/>	
		</div>
}	
