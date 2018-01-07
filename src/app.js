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
	const getVen = (e) => {
		e.preventDefault()
		getUserVen(data.user)
		.then(action => dispatchAction(action))
	}

	const changeVenView = (e) => {
		dispatchAction(changeVenView(e.target.value))
	}
	
	const VenOptions = ({ven}) => {
		return ven.map(ven => {return <option key={ven._id} value={ven}>{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</option>})
	}
	
	return  <div id="characterView">
			<select id="userVen" onChange={changeVenView} value={data.ven[0]}>
				<VenOptions ven={data.ven}/>
			</select>
			<button onClick={getVen}>Get Ven</button>	
			<VenSheet ven={data.venView} dispatchAction={dispatchAction}/>
		</div>


}

ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))

  
  
