import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import {testState} from "./testState"
import reducer from "./reducer"
import {getUserVen,changeVenView} from "./actions"
import VenSheet from "./VenSheet/VenSheet"


const store = createStore(reducer,testState);


const dispatchAction = (action) => {
	store.dispatch(action)
}

const util = {
	dispatchAction: dispatchAction
}


//store.subscribe(()=> console.log(store.getState()))
store.subscribe(() => {ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))})


const App = ({data,util}) => {
	const getUserVen = (e) => {
		console.log(data.user)
		util.dispatchAction(getUserVen(data.user))
	}

	const changeVenView = (e) => {
		dispatchAction(changeVenView(e.target.value))
	}
	
	const UserVen = ({ven}) => {
		return	<select id="userVen" onChange={changeVenView}>
				{ven.map(ven => {return <option key={ven._id} value={ven}>{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</option>})}
			</select>

	}
	
	return  <div id="characterView">
			<UserVen ven={data.ven}/>
			<button onClick={getUserVen}>Get Ven</button>
			<VenSheet ven={data.venView} dispatchAction={dispatchAction}/>
		</div>


}

ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))

  
  
