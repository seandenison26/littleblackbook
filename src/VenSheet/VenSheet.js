import React from "react"
import * as R from 'ramda'
import {changeVenView,saveVenView, createDoc} from "../actions.js"
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
	       	virtue = e.target.dataset.path,
	       	input = e.target.value
		VenViewInputChange(['virtues',virtue],input)
	}
	const VirtueTabs = Object.keys(virtues).map(v => {return <li key={`virtue.${v}`}>{v.toUpperCase()}: <select  data-path={`${v}`} onChange={VirtueChange} defaultValue={virtues[v]}>
												<option key={`W${v}`} value="W">W</option>
												<option key={`2${v}`} value="2">2</option>
												<option key={`3${v}`} value="3">3</option>
												<option key={`4${v}`} value="4">4</option>
												<option key={`5${v}`} value="5">5</option>
												<option key={`6${v}`} value="6">6</option>
												<option key={`7${v}`} value="7">7</option>
											</select></li>})
	return  <div id="virtuebar">
			{VirtueTabs}
		</div>		
}


const HighConcept = ({highConcept,VenViewInputChange}) => {
	const HighConceptChange = (e) => { VenViewInputChange(['highConcept',e.target.dataset.path],e.target.value) }

	return 	<div id="highConceptTab">
			<h2>High Concept</h2>	
			<p className="highConTab" >House: <input id='highConceptTab.house' data-path="house" type="text" onChange={HighConceptChange} value={highConcept.house} /></p>				
			<p className="highConTab" >Family Name: <input id='highConceptTab.familyName' data-path="familyName" type="text" onChange={HighConceptChange} value={highConcept.familyName} /></p>				
			<p className="highConTab" >Public Name: <input  id='highConceptTab.publicName'  data-path="publicName" type="text" onChange={HighConceptChange} value={highConcept.publicName} /></p>				
			<p className="highConTab" >Public Meaning: <input data-path="publicMeaning" onChange={HighConceptChange} value={highConcept.publicMeaning} /></p>				
			<p className="highConTab" >Secret Name: <input data-path="secretName" type="text" onChange={HighConceptChange} value={highConcept.secretName}/></p>				
			<p className="highConTab" >Age: <input data-path="age" type="text" onChange={HighConceptChange} value={highConcept.age} /></p>				
			<p className="highConTab" >Family: <input data-path="family" onChange={HighConceptChange} type="text" value={highConcept.family}/></p>				
			<p className="highConTab" >Title: <input data-path="title" onChange={HighConceptChange} value={highConcept.title} /></p>				
			<p className="highConTab" >Age Points: <input data-path="agepoints" onChange={HighConceptChange} value={highConcept.agepoints}/></p>				
		</div>	
}	

//New Aspect Button?
//Treat Aspects like Twitter? I/T/C cap out at 140 chars?
const AspectPage = ({aspects,VenViewInputChange,newAspectName,newAspect}) => {
	const AspectPageChange  = (e) => {
		const aspectsChange = (path,value) => {
			if(path === "newAspectName") {
				VenViewInputChange([path],value)
			}
			else {
				VenViewInputChange(['aspects'],aspects.map(aspect =>
					aspect._id === e.target.id ? R.assocPath([path],value,aspect) : aspect
				))
			}
		}
		let
			path = e.target.dataset.path,
	       		value = e.target.value
			aspectsChange(path,value)
	}
	const AspectCard = ({aspect}) => {
	
	return 	<div className="aspect">
			<h2 key={`${aspect._id}.season`} >{aspect.season || "Aspect"}</h2>
			<h3 key={`${aspect._id}.name`} >Name:<input data-path="name" onChange={AspectPageChange} key={`${aspect._id}.name.input`} value={aspect.name}/></h3>
			<p key={`${aspect._id}.invoke`} >Ivoke: <input data-path="invoke" key={`${aspect._id}.invoke.input`} onChange={AspectPageChange}  value={aspect.invoke}/></p>
			<p key={`${aspect._id}.tag`} >Tag:  <input data-path="tag" key={`${aspect._id}.tag.input`} onChange={AspectPageChange}  value={aspect.tag}/></p>
			<p key={`${aspect._id}.compel`} >Compel: <input data-path="compel" key={`${aspect._id}.compel.input`} onChange={AspectPageChange} value={aspect.compel}/></p>
		</div>
	}
	
	const AspectCards = ({aspects}) => {return aspects.map(a => <AspectCard key={a._id} aspect={a}/>)} 
	
	const createAspect = (e) => {
		newAspect(document.getElementById("newAspectName").value)
	}

	return 	<div id="aspects">
				{aspects.length > 0 ? <AspectCards aspects={aspects}/>: null}
				<input data-path="newAspectName" id="newAspectName" onChange={AspectPageChange} value={newAspectName}/>
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
					VenViewInputChange(['aspects'],ven.aspects.concat(doc))	
				}	
			}
		}
	}

	const VenViewInputChange = (path,input) => {
		dispatchAction(changeVenView(R.assocPath(path,input,ven)))
	}

	return	<div id="venSheet">
			<VenHeader ven={ven}/>
			<VirtueBar virtues={ven.virtues} VenViewInputChange={VenViewInputChange}/>	
			<HighConcept highConcept={ven.highConcept} VenViewInputChange={VenViewInputChange}/>	
			<AspectPage aspects={ven.aspects} newAspectName={ven.newAspectName || ""} newAspect={newUserDoc("aspect")} VenViewInputChange={VenViewInputChange}/>	
		</div>
}	
