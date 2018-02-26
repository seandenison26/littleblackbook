import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import {testState} from "./testState"
import reducer from "./reducer"
import {getUserVen,changeVenView,updateVenView} from "./actions"
import "./app.css"
import VenSheet from "./VenSheet/VenSheet"


const store = createStore(reducer,testState);


const dispatchAction = (action) => {
	store.dispatch(action)
}

const util = {
	dispatchAction: dispatchAction
}

store.subscribe(() => {ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))})

const App = ({data,util}) => {
	const getVen = (e) => {
		e.preventDefault()
		getUserVen(data.user)
		.then(action => dispatchAction(action))
	}

	const selectVenView = (e) => {
		dispatchAction(changeVenView(data.ven[e.target.value]))
	}
	
	const VenSelectBar = ({ven}) => {
		let options = ven.map((ven, i) => {return <option key={ven._id} value={i}>{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</option>})
		return 	<div id ='venSelectBar'>
					<select id="userVen" onChange={selectVenView} value={data.venView}>
						{options}		
					</select>
				<button onClick={getVen}>Get Ven</button>	
			</div>
	}

	return  <div id="viewContainer">
			<VenSelectBar ven={data.ven}/>
			<VenSheet author={data.user}  ven={data.ven} view={data.venView} dispatchAction={dispatchAction}/>
		</div>


}

ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))

  
  
