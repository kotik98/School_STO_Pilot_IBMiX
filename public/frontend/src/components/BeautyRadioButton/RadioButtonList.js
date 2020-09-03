import React, {useState} from 'react';
import { radio_data } from './radio_data';
import RadioButtonItem from './RadioButtonItem';
import './radio.css'; 

export default function RadioButtonList() {
    const [checked, setChecked] = useState(null);

    return (
        <div className={'main_radio_block'}>
            {radio_data.map(item => <RadioButtonItem item={item} />)}
        </div>
    )
}