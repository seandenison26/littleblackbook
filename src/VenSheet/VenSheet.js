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
	const VirtueTabs = Object.keys(virtues).map(v => {return <li>{v.toUpperCase()}: <select key={`virtue.${v}`} data-path={`${v}`} onChange={VirtueChange} defaultValue={virtues[v]}>
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
			<p>House: <input id='highConceptTab.house' data-path="house" type="text" onChange={HighConceptChange} value={highConcept.house} /></p>				
			<p>Family Name: <input id='highConceptTab.familyName' data-path="familyName" type="text" onChange={HighConceptChange} value={highConcept.familyName} /></p>				
			<p>Public Name: <input  id='highConceptTab.publicName'  data-path="publicName" type="text" onChange={HighConceptChange} value={highConcept.publicName} /></p>				
			<p>Public Meaning: <input data-path="publicMeaning" onChange={HighConceptChange} value={highConcept.publicMeaning} /></p>				
			<p>Secret Name: <input data-path="secretName" type="text" onChange={HighConceptChange} value={highConcept.secretName} /></p>				
			<p>Age: <input data-path="age" type="text" onChange={HighConceptChange} value={highConcept.age} /></p>				
			<p>Family: <input data-path="family" onChange={HighConceptChange} type="text" value={highConcept.family} /></p>				
			<p>Title: <input data-path="title" onChange={HighConceptChange} value={highConcept.title} /></p>				
			<p>Age Points: <input data-path="agepoints" onChange={HighConceptChange} value={highConcept.agepoints} /></p>				
		</div>	
}	

//New Aspect Button?
//Treat Aspects like Twitter? I/T/C cap out at 140 chars?
const AspectPage = ({aspects,VenViewInputChange,newAspectName,newAspect}) => {
	const AspectPageChange = (key) => (e) => {
		const aspectsChange = (id,value) => {
			if(key === "newAspectName") {
				VenViewInputChange([key],value)
			}
			else {
				VenViewInputChange(['aspects'],aspects.map(aspect =>
					aspect._id === id ? R.assocPath([key],value,aspect) : aspect
				))
			}
		}
		let
			id = e.target.id,
	       		value = e.target.value
			aspectsChange(id,value)
	}
	const AspectCard = ({aspect, key}) => {
		console.log(aspect)	
		console.log(key)	
		
	return 	<div id={aspect._id} className="aspect">
			<h2>{aspect.season || "Aspect"}</h2>
			<h3>Name:<input onChange={AspectPageChange('name')} value={aspect.name}/></h3>
			<p>Ivoke: <input onChange={AspectPageChange('invoke')}  value={aspect.invoke}/></p>
			<p>Tag:  <input onChange={AspectPageChange('tag')}  value={aspect.tag}/></p>
			<p>Compel: <input onChange={AspectPageChange('compel')} value={aspect.compel}/></p>
		</div>
	}
	
	const AspectCards = ({aspects}) => {return aspects.map(a => <AspectCard key={a._id} aspect={a}/>)} 
	
	const createAspect = (e) => {
		newAspect(document.getElementById("newAspectName").value)
	}

	return 	<div id="aspects">
				{aspects.length > 0 ? <AspectCards aspects={aspects}/>: null}
				<input id="newAspectName" onChange={AspectPageChange('newAspectName')} value={newAspectName}/>
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
