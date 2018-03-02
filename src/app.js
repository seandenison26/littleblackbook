import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import {testState} from "./testState"
import reducer from "./reducer"
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
	return  <div id="viewContainer">
			<VenSheet author={data.user}  ven={data.ven} view={data.venView} dispatchAction={dispatchAction}/>
		</div>
}

ReactDOM.render(<App data={store.getState()} util={util}/>, document.getElementById('app'))

  
  
