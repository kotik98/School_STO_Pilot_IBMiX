import React, { useState } from 'react';
import RadioButtonItem from './RadioButtonItem';
import './radio.css';

// Redux Block
import { useDispatch } from 'react-redux';
// End of redux

export default function RadioButtonList({ data, dispatcher_func }) {
    const [radio_data, setRadioData] = useState(data);
    const dispatch = useDispatch();

    const changeState = (selected) => {
        let new_data = radio_data.map(item => {
            if (item.name == selected)
                item.checked = true;
            else
                item.checked = false;
            return item;
        });
        dispatch(dispatcher_func(new_data));
        setRadioData(new_data);
    }

    return (
        <div className={'main_radio_block'}>
            {radio_data.map(item => <RadioButtonItem item={item} onChangeCallback={changeState} />)}
        </div>
    )
}