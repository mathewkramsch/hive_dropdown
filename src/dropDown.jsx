/* dropDown.jsx */

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './dropDown.css';

function Option(props) {
	const isSelected = ()=>{
		if (props.selected.includes(props.option.value)) return true;
		return false;
	}
	const [selected, setSelected] = useState(isSelected())
	const selectItem = (e)=>{
		props.selectFunc(props.option.name, props.option.value);
		setSelected(!selected)
	}
	return (
		<div className={selected? 'selected-item option' : 'option'}
			onClick={selectItem}>
			{props.option.name}
		</div>
	);
}

function Options(props) {
	let optionsList = props.options
	const getOptions = (option, i)=>{
		return (
			<Option option={option} selectFunc={props.selectFunc} 
				selected={props.selected} key={i}/>
		);
	}
	return (
		<div className='options'>{ optionsList.map(getOptions) }</div>
	);
}

export default function DropDown(props) {
	const [openOptions, setOpenOptions] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState([])
	const [selectedOptionsValues, setSelectedOptionsValues] = useState([])

	const toggleOpenOptions = ()=>{
		setOpenOptions(!openOptions);
	}
	const focusOutOptions = ()=>{
		return  // do nothing for now
		setTimeout(()=>{  /* delay so option can be selected */
			setOpenOptions(false);
		},100);
	}
	const selectItem = (optionName, optionValue)=>{
		let optionNames = selectedOptions
		let optionValues = selectedOptionsValues
		if (optionValues.includes(optionValue)) {
			let optionNameIndex = optionNames.indexOf(optionName)
			let optionValueIndex = optionValues.indexOf(optionValue)
			optionNames.splice(optionNameIndex, 1);
			optionValues.splice(optionValueIndex, 1);
		} else  {
			optionNames.push(optionName);
			optionValues.push(optionValue);
		}
		setSelectedOptions(optionNames);
		setSelectedOptionsValues(optionValues);
		props.onSelectFunc(optionValues);
	}
	const listOptionNames = ()=>{
		return selectedOptions.toString()
	}

	return (
		<div className='drop-down-form'>
			<label>{props.label}</label>

			<div className='select' tabIndex='0' 
				onClick={toggleOpenOptions} onBlur={focusOutOptions}>
				<span id='select-text' 
					className={selectedOptions===props.default? '':'selected-options'}>
					{ selectedOptions.length===0? props.default : listOptionNames() }
				</span>
				<FontAwesomeIcon icon={faChevronDown} id='select-icon'/>
			</div>

			{ openOptions && <Options selectFunc={selectItem} 
				options={props.options} selected={selectedOptionsValues}/> }
			{/*<small id='error-message'></small>*/}
		</div>
	);
}
