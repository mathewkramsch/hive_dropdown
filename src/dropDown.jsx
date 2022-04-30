/* dropDown.jsx */

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './dropDown.css';

function Option(props) {
	const selectItem = (e)=>{
		props.selectFunc(props.name);
	}
	return (
		<div className='option' onClick={selectItem}>{props.name}</div>
	);
}

function Options(props) {
	let optionsList = props.options
	const getOptions = (option, i)=>{
		return <Option name={option} selectFunc={props.selectFunc} key={i}/>
	}
	return (
		<div className='options'>{ optionsList.map(getOptions) }</div>
	);
}

export default function DropDown(props) {
	const [openOptions, setOpenOptions] = useState(false)
	const [selectedOption, setSelectedOption] = useState('Select Option')

	const toggleOpenOptions = ()=>{
		setOpenOptions(!openOptions);
	}
	const focusOutOptions = ()=>{
		setTimeout(()=>{  /* delay so option can be selected */
			setOpenOptions(false);
		},100);
	}
	const selectItem = (itemName)=>{
		setOpenOptions(false);
		setSelectedOption(itemName)
	}

	return (
		<div className='drop-down-form'>
			<label>Options to Choose</label>
			
			<div className='select' tabIndex='0' 
				onClick={toggleOpenOptions} onBlur={focusOutOptions}>
				<span id='select-text' 
					className={selectedOption==='Select Option'? '':'selected-text'}>
					{selectedOption}
				</span>
				<FontAwesomeIcon icon={faChevronDown} id='select-icon'/>
			</div>

			{ openOptions && <Options selectFunc={selectItem} options={props.options}/> }

			<small id='error-message'></small>
		</div>
	);
}
