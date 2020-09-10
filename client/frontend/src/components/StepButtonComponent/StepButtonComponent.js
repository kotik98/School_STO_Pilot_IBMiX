import React from 'react';
import { Button } from 'antd';

const StepButtonComponent = (props) => {
    return (
        <div style={props.backClick ? {display: 'flex', justifyContent: 'space-between'} : {float: 'right'}}>
            {props.backClick &&
                <Button
                    type="primary"
                    style={BtnStyleStep}
                    onClick={props.backClick}
                    >
                        <div style={button_style}>
                            <span style={arrow_style}>&#8592;</span>
                            <span>Назад</span>
                        </div>
                </Button>
            }
            <div style={nextBtnGroup}>
                {props.skipClick && 
                    <Button
                    type="text"
                    style={{...BtnStyle, backgroundColor: 'rgb(195,214,250)'}}
                    onClick={props.skipClick}
                    >
                        <div style={button_style}>
                            <span>Пропустить</span>
                            <span style={arrow_style}>&#8594;</span>
                        </div>
                    </Button>
                }

                <Button
                type="primary"
                style={{...BtnStyle, marginLeft: '30px'}}
                onClick={props.nextClick}
                >
                    <div style={button_style}>
                        <span>{props.lastStep ? "Сохранить" : "Далее"}</span>
                        <span style={arrow_style}>&#8594;</span>
                    </div>
                </Button>

            </div>
    </div>
    )
}

const button_style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '10px', 
    paddingRight: '10px',
}
const arrow_style = {
    fontSize: '2em',
}
const nextBtnGroup = {
    display: 'flex',
    justifyContent: 'space-between',
}
const BtnStyle = {
    background: "#5459CD",
    borderСolor: "#5459CD",
    width: "160px",
    boxShadow: "0 12px 12px -8px rgba(84, 89, 205, 0.5)",
    borderRadius: "10px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "12px"
}
const BtnStyleStep = {
    marginLeft: "10px",
    background: "#5459CD",
    borderСolor: "#5459CD",
    width: "160px",
    boxShadow: "0 12px 12px -8px rgba(84, 89, 205, 0.5)",
    borderRadius: "10px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "12px",
}

export default StepButtonComponent;