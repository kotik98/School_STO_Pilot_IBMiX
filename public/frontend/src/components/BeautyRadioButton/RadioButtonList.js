import React, {useState} from 'react';
import RadioButtonItem from './RadioButtonItem';
import './radio.css'; 

// Redux Block
import { useSelector, useDispatch } from 'react-redux';
import { SetFlightDirection } from "../../redux/action";
// End of redux

export default function RadioButtonList() {
    const [radio_data, setRadioData] = useState(useSelector(state => state.flight_direction[0]));
    const dispatch = useDispatch();

    const changeState = (selected) => {
        let new_data = radio_data.map(item => {
            if (item.name == selected)
                item.checked = true;
            else
                item.checked = false;
            return item;
        });
        dispatch(SetFlightDirection(new_data));
        setRadioData(new_data);
    }

    return (
        <div className={'main_radio_block'}>
            {radio_data.map(item => <RadioButtonItem item={item} onChangeCallback={changeState}/>)}
        </div>
    )
}