import React from "react"
import * as R from 'ramda'
import {getUserVen,updateVenView,changeVenView,saveVenView,createDoc,updateDoc} from "../actions.js"
import "./VenSheet.css"
/*	Components Needed
 *		VenSheet
 *			 > Relics, Rituals, Artifacts
 */


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
	const VirtueTabs = Object.keys(virtues).map(v => {return <li key={`virtue.${v}`}>{v.toUpperCase()}: <select  data-path={`${v}`} onChange={VirtueChange} defaultValue={virtues[v] || 'W'}>
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
			<p className="highConTab" >Public Name: <input  id='highConceptTab.publicName'  data-path="publicName" type="text" onChange={HighConceptChange} value={highConcept.publicName || ``} /></p>
			<p className="highConTab" >Public Meaning: <input data-path="publicMeaning" onChange={HighConceptChange} value={highConcept.publicMeaning || ``} /></p>
			<p className="highConTab" >Family Name: <input id='highConceptTab.familyName' data-path="familyName" type="text" onChange={HighConceptChange} value={highConcept.familyName || ``} /></p>
			<p className="highConTab" >House: <input id='highConceptTab.house' data-path="house" type="text" onChange={HighConceptChange} value={highConcept.house || ``} /></p>
			<p className="highConTab" >Secret Name: <input data-path="secretName" type="text" onChange={HighConceptChange} value={highConcept.secretName || ``}/></p>
			<p className="highConTab" >Age: <input data-path="age" type="text" onChange={HighConceptChange} value={highConcept.age || ``} /></p>
			<p className="highConTab" >Family: <input data-path="family" onChange={HighConceptChange} type="text" value={highConcept.family || ``}/></p>
			<p className="highConTab" >Title: <input data-path="title" onChange={HighConceptChange} value={highConcept.title || ``} /></p>
			<p className="highConTab" >Age Points: <input data-path="agepoints" onChange={HighConceptChange} value={highConcept.agepoints || ``}/></p>
		</div>
}

const SaveButton = ({doc,save}) => {
	return <button className='delete-btn'  data-doc={doc} onClick={save}>Save</button>
}

const DeleteButton = ({doc,del}) => {
	return <button className='delete-btn' data-doc={doc} onClick={del}>Delete</button>
}

const AspectCard = ({aspect, AspectPageChange}) => {
return 	<div key={aspect._id} className="aspect">
		<h2 key={`${aspect._id}.season`} >{aspect.season}</h2>
		<h3 key={`${aspect._id}.name`} >Name:<input type="text" data-path="name" data-id={`${aspect._id}`} onChange={AspectPageChange} key={`${aspect._id}.name.input`} value={aspect.name}/></h3>
		<p key={`${aspect._id}.invoke`} >Ivoke: <input type="text" data-path="invoke" data-id={`${aspect._id}`}  key={`${aspect._id}.invoke.input`} onChange={AspectPageChange}  value={aspect.invoke}/></p>
		<p key={`${aspect._id}.tag`} >Tag:  <input type="text" data-path="tag" data-id={`${aspect._id}`}  key={`${aspect._id}.tag.input`} onChange={AspectPageChange}  value={aspect.tag}/></p>
		<p key={`${aspect._id}.compel`} >Compel: <input type="text" data-path="compel" data-id={`${aspect._id}`} key={`${aspect._id}.compel.input`} onChange={AspectPageChange} value={aspect.compel}/></p>
		<SaveButton doc={aspect} save={null}/>
		<DeleteButton doc={aspect} del={null}/>
	</div>
}

//New Aspect Button?
//Treat Aspects like Twitter? I/T/C cap out at 140 chars?
const AspectPage = ({aspects,VenViewInputChange,newAspectName,newAspect}) => {

	const AspectPageChange  = (e) => {
		const aspectsChange = (path,value,id) => {
			if(path === "newAspectName") {
				VenViewInputChange([path],value)
			}
			else {
				const changeLens = R.lensIndex(R.findIndex(R.propEq('_id',id))(aspects))
				const changeAspect = (obj) => R.assocPath([path],value,obj)
				VenViewInputChange(['aspects'],R.over(changeLens,changeAspect,aspects))
			}
		}
		let
			path = e.target.dataset.path,
			value = e.target.value,
			_id = e.target.dataset.id
			aspectsChange(path,value,_id)
	}

	const createAspect = (e) => { newAspect("aspects",document.getElementById("newAspectName").value) }

	const Cards = aspects.length > 0 ? aspects.map(a => <AspectCard key={`${a._id}.card`} aspect={a} AspectPageChange={AspectPageChange}/> ) : null

	const Search = <div key="newAspectBar">
				<input data-path="newAspectName" id="newAspectName" onChange={AspectPageChange} value={newAspectName}/>
				<button onClick={createAspect}>New Aspect</button>
			</div>

	return 	<div key="AspectPage">
				{Search}
				{Cards}
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

const VenSelectBar = ({ven,view,getVen,selectVenView,SaveVen,DelVen}) => {
	let options = ven.map((ven, i) => {return <option key={ven._id} value={i}>{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</option>})
	return 	<div id='venSelectBar'>
				<select id="userVen" onChange={selectVenView} value={view}>
					{options}
				</select>
			<button onClick={getVen}>Get Ven</button>
			<SaveButton doc={view} save={SaveVen}/>
			<DeleteButton doc={view} del={DelVen}/>
		</div>
}

const CreateVenBar = ({newVenDoc,newVenName,changeName}) => {
	const newVen = (e) => {
		newVenDoc("ven",newVenName)
	}

	const changeNewVenName = (e) => {
		let path = e.target.dataset.path, value = e.target.value
		changeName([path],value)
	}			

	return 	<div id='venCreateBar'>
			<input data-path="newVenName" key="newVenName" onChange={changeNewVenName} value={newVenName}/>
			<button onClick={newVen}>Create Ven</button>
		</div>
}

const updateObj = (newObj) => (oldObj) => {
}

export default function VenSheet({ven,view, dispatchAction, author}) {
	
	const venIdLens = (id) => R.lensIndex(R.findIndex(R.propEq('_id',id))(ven))

	const getVen = (e) => {
		e.preventDefault()
		getUserVen(author)
		.then(action => dispatchAction(action))
	}

	const SaveVen = async (e) => {
		console.log(ven)
		let savedVen = await updateDoc(view)
		let newArr = (obj) => savedVen	
		let newVenArr =  R.over(venIdLens(savedVen._id),newArr,ven)
		console.log(newVenArr)
		dispatchAction({type:'CHANGE_VEN', ven:newVenArr})
		dispatchAction({type:'CHANGE_VEN_VIEW', venView:savedVen})
	}
	const DelVen = (e) => {
		e.preventDefault()
	}

	const selectVenView = (e) => {
		dispatchAction(changeVenView(ven[e.target.value]))
	}

	const createVenDoc = async (collection,name) => {
		const addToArray = (value) => (obj) => R.assocPath([collection],obj[collection].concat(value),obj)
		let collectionDoc = await createDoc(collection,author,name),newVenArr,venDoc
		if (collection === 'ven') {
			venDoc = collectionDoc 
			newVenArr = ven.concat(collectionDoc)
		}
		else {
			venDoc = await updateDoc(addToArray(collectionDoc)(R.find(R.propEq('_id',view._id))(ven)))
			newVenArr = R.over(venIdLens(view._id),addToArray(collectionDoc),ven) 
		}

		dispatchAction({type:'CHANGE_VEN', ven:newVenArr})
		dispatchAction({type:'CHANGE_VEN_VIEW', venView:venDoc})
	}

	const VenViewInputChange = (path,input) => {
		dispatchAction(changeVenView(R.assocPath(path,input,view)))
	}

	return	<div id="venSheet">
			<VenSelectBar ven={ven} view={view} getVen={getVen} SaveVen={SaveVen} DelVen={DelVen}  selectVenView={selectVenView}/>
			<CreateVenBar newVenDoc={createVenDoc} newVenName={view.newVenName || ``} changeName={VenViewInputChange}/>
			<VenHeader ven={view}/>
			<VirtueBar virtues={view.virtues} VenViewInputChange={VenViewInputChange}/>
			<HighConcept highConcept={view.highConcept} VenViewInputChange={VenViewInputChange}/>
			<AspectPage aspects={view.aspects} newAspectName={view.newAspectName || ``} newAspect={createVenDoc} VenViewInputChange={VenViewInputChange}/>
		</div>
}
