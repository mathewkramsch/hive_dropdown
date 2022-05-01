/* dropDown.jsx */

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
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
			{ selected? 
				<FontAwesomeIcon icon={faCircleDot} className='option-icon'/> :
				<FontAwesomeIcon icon={faCircle} className='option-icon' id='open-circle'/>
			}
			<span>{props.option.name}</span>
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
	const [selecting, setSelecting] = useState(false)

	const toggleOpenOptions = ()=>{
		setOpenOptions(!openOptions);
	}
	const focusOutSelect = ()=>{
		setTimeout(()=>{  /* delay so option can be selected */
			setOpenOptions(false)
		},100)
	}
	const focusOutOptions = ()=>{
		setTimeout(()=>{  /* delay so option can be selected */
			setSelecting(false)
		},100)
	}
	const selectItem = (optionName, optionValue)=>{
		setSelecting(true)
		setOpenOptions(true)
		let optionsSet = new Set(selectedOptions)
		let optionsValuesSet = new Set (selectedOptionsValues)
		if (optionsValuesSet.has(optionValue)) {
			optionsSet.delete(optionName)
			optionsValuesSet.delete(optionValue)
		} else  {
			optionsSet.add(optionName)
			optionsValuesSet.add(optionValue)
		}
		setSelectedOptions([...optionsSet]);
		setSelectedOptionsValues([...optionsValuesSet]);
		props.onSelectFunc([...optionsValuesSet]);
	}
	const getSelectedOptions = (option, i)=>{
		return (
			<span className='option-bubble' key={i}>{option}</span>
		);
	}

	return (
		<div className='drop-down-form'>
			<label>{props.label}</label>

			<div className={selectedOptions.length===0? 'select':'select option-selected'}
				tabIndex='0' onClick={toggleOpenOptions} onBlur={focusOutSelect}>
				<span id='select-text' 
					className={selectedOptions.length===0? '':'selected-options'}>
					{ selectedOptions.length===0? 
							props.default : 
							selectedOptions.map(getSelectedOptions)
					}
				</span>
				<FontAwesomeIcon icon={faChevronDown} id='select-icon'/>
			</div>

			{ (openOptions || selecting) && 
				<div onBlur={focusOutOptions} tabIndex='0'>
					<Options selectFunc={selectItem} options={props.options}
						selected={selectedOptionsValues}/>
				</div>
			}
			{/*<small id='error-message'></small>*/}
		</div>
	);
}
