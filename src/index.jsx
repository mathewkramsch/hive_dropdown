/* index.jsx */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import './index.css'
import DropDown from './dropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function App() {
	const [selectedValues, setSelectedValues] = useState([])

	/* can pass any list option name/value pairs to DropDown component */
	const options = []
	for (let i=1; i<=20; i++) {
		options.push({
			name: `Option ${i}`,
			value: i
		});
	}

	/* can pass custom function to do handle select behavior */
	const onSelect = (values)=>{
	/* this function will just update state with list of selected values
		but you can do anything you want with the selected values */
		setSelectedValues(values)
	}

	const handleSubmit = ()=>{
		if (selectedValues.length===0)
			console.log('No options selected')
		else
			console.log(`Option values selected: ${selectedValues}`)
	}

	return (
		<div className='main'>
			<h1>Custom Drop-Down React Component</h1>
			<form onSubmit={e=>e.preventDefault()}>
				<DropDown 
					options={options} 
					onSelectFunc={onSelect}
					default='Select Option'
					label='Options to Choose'
				/>
				<button onClick={handleSubmit}>
					Submit
					<FontAwesomeIcon icon={faArrowRight} id='submit-icon'/>
				</button>
			</form>
		</div>
	);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <React.StrictMode><App/></React.StrictMode> );
