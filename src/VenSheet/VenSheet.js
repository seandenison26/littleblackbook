import React from "react"
import {updateVenView, createDoc} from "../actions.js"
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
	const VirtueChange = (e) => {
	let
	       	virtue = e.target.id,
	       	input = e.target.value
		VenViewInputChange(virtue,input)
	}
	const VirtueTabs = Object.keys(virtues).map(v => {return <li>{v.toUpperCase()}: <select key={`${v}`} id={`${v}`} onChange={VirtueChange} defaultValue={virtues[v]}>
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


const HighConcept = ({highConcept,VenViewInputChange}) => {
	const HighConceptChange = (e) => {
	let
		highConcept = e.target.id,
	       	input = e.target.value
		VenViewInputChange(highConcept,input)
	}
	return 	<div id="highConceptTab">
			<h2>High Concept</h2>	
			<p>House: <input id="house" type="text" onChange={HighConceptChange} value={highConcept.house} /></p>				
			<p>Family Name: <input id="familyName" type="text" onChange={HighConceptChange} value={highConcept.familyName} /></p>				
			<p>Public Name: <input id="publicName" type="text" onChange={HighConceptChange} value={highConcept.publicName} /></p>				
			<p>Public Meaning: <input id="publicMeaning" onChange={HighConceptChange} value={highConcept.publicMeaning} /></p>				
			<p>Secret Name: <input id="secretName" type="text" onChange={HighConceptChange} value={highConcept.secretName} /></p>				
			<p>Age: <input id="age" type="text" onChange={HighConceptChange} value={highConcept.age} /></p>				
			<p>Family: <input id="family" onChange={HighConceptChange} type="text" value={highConcept.family} /></p>				
			<p>Title: <input id="title" onChange={HighConceptChange} value={highConcept.title} /></p>				
			<p>Age Points: <input id="agepoints" onChange={HighConceptChange} value={highConcept.agepoints} /></p>				
		</div>	
}	

//New Aspect Button?
//Treat Aspects like Twitter? I/T/C cap out at 140 chars?
const AspectPage = ({aspects, dispatchAction,VenViewInputChange, newAspectName, newAspect}) => {
	const AspectPageChange = (e) => {
		const aspectsChange = (id,value) => {
			if(id === "newAspectName") {
				VenViewInputChange("newAspectName",value)
			}
		}
		let
			id = e.target.id,
	       		value = e.target.value
			aspectsChange(id,value)
	}
	const AspectCard = ({aspect, key}) => {
		return 	<div id={aspect._id} className="aspect">
				<h2>{aspect.season || "Aspect"}</h2>
				<h3>Name:<input onChange={AspectPageChange(aspect)} value={aspect.name}/></h3>
				<p>Ivoke: {aspect.invoke}</p>
				<p>Tag: {aspect.tag}</p>
				<p>Compel: {aspect.compel}</p>
			</div>
	}
	
	const AspectCards = ({aspects}) => {return aspects.map(a => <AspectCard key={a._id} aspect={a}/>)} 
	
	const createAspect = (e) => {
		console.log(newAspect(document.getElementById("newAspectName").value))
	}

	return 	<div id="aspects">
				{aspects.length > 0 ? <AspectCards aspects={aspects}/>: null}
				<input id="newAspectName" onChange={AspectPageChange} value={newAspectName}/>
				<button onClick={createAspect}>New Aspect</button>
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
export default function VenSheet({ven, dispatchAction, author}) {
	const newUserDoc = (type) => {
		return async (name) => {
			var doc = await createDoc(type,author,name)
			switch (type) {
				case "aspect": {
					//dispatchAction(updateVenView(ven,"aspects",ven.aspects.concat(doc)))
					console.log(doc)
				}	
			}
		}
	}


	const VenViewInputChange = (key,input) => {
		dispatchAction(updateVenView(ven,key,input))
	}

	return	<div id="venSheet">
			<VenHeader ven={ven}/>
			<VirtueBar virtues={ven.virtues} VenViewInputChange={VenViewInputChange}/>	
			<HighConcept highConcept={ven.highConcept} VenViewInputChange={VenViewInputChange}/>	
			<AspectPage aspects={ven.aspects} newAspectName={ven.newAspectName || ""} newAspect={newUserDoc("aspect")} VenViewInputChange={VenViewInputChange}/>	
		</div>
}	
