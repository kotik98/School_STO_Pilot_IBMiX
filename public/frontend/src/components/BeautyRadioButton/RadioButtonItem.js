import React, {useState} from 'react';
import './radio.css';

export default function RadioButtonItem({item}) {
    return (
        <div className={'sub_radio_block'} style={{backgroundColor: item.style}}>
            <div className={'radio_circle'} style={item.checked ? {backgroundColor: 'rgb(180,244,209)'} : {backgroundColor: 'white'}}></div>
            <div className={'radio_text_wrapper'}>
                <p className={'radio_text'} style={item.font ? {color: item.font} : {color: 'black'}}>{item.name}</p>
            </div>
        </div>
    )
}