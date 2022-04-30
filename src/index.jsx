/* index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DropDown from './dropDown';

function App() {
	const options = []
	for (let i=1; i<=20; i++) options.push(`Option ${i}`)

	return (
		<div className='main'>
			<h1>Custom Drop-Down React Component</h1>
			<DropDown options={options}/>
		</div>
	);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <React.StrictMode><App/></React.StrictMode> );
