import React, { Component } from 'react';
import logo from "../images/logo.png";
import team from "../images/CEO3.jpg";
import github from "../images/github.png";
import inst from "../images/inst.png";
import npm from "../images/npm.png";

import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";

class HelpProject extends Component {
    render() {
        return (
            <div className='registerForm'>

                <Card style={{ borderRadius: '30px', marginTop: '10px', backgroundColor: 'white', width: '80%' }}>

                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '130px' }} src={logo} alt="" />
                        <br />
                        <h3 style={{ color: '#4a76a8' }}>О Компании IBMiX!</h3>
                    </div>
                    <br />

                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <div className={'fontModal ibmxFontSize'} style={{ textAlign: 'justify', paddingLeft: '20px' }}>

                            <p><img src={team} alt="Without photo" style={{ borderRadius: '300px' }} width={'250pxpx'} align="left"
                                vspace="5" hspace="5" /> IBM iX®, ваш глобальный партнер по бизнес-  дизайну

                                Мы работаем на стыке стратегии, творчества и технологий, чтобы помочь нашим клиентам переосмыслить свой бизнес в цифровом формате. Сотрудничайте с нами, чтобы определить вашу стратегию, создать исключительный опыт и построить свой бизнес с помощью дизайна. Хороший клиентский опыт случается, когда сотрудники
уполномочены создавать и предоставлять их. Наше исследование
выявило шесть практик, которым руководствуются ведущие организации, чтобы
активировать свою CX North Star.</p>
                            <br />

                            <br />  <br />  <br />
                            <h3 style={{ color: '#4a76a8', textAlign: 'right' }}>Главный креативный директор, IBM iX</h3>
                            <div style={{ color: '#4a76a8', textAlign: 'right' }}>Билли Сибрук</div>
                            <div style={{ textAlign: 'right' }}> <br />IBM iX®<a href="https://www.ibm.com/services/ibmix/"><img className={"icons"} style={{ height: "20px" }} src={logo} alt="" /></a></div>
                        </div>


                        <br />
                        {/* <br />
                                    <br /> */}


                    </div>
                    <br />
                    {/* <Avatar
                        style={{ align: 'center' }}
                        shape="square"
                        size={750}
                        icon="user"
                        src={team}
                    /> */}
                    <br />


                </Card>
                <br />
            </div >
        );
    }
}

export default HelpProject;