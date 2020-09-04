import React, { Suspense, Component, useState } from "react";
// import avatar from "../images/avatar.png";
import plane from "../images/plane.jpg";
import logo from '../images/logo.png';
import { Tabs } from 'antd';
import { UncontrolledCollapse, Button as Buttonr, CardBody, Card as Cardr, Collapse as Collapser} from 'reactstrap';

import {
    Card,
    Modal,
    Avatar,
    Icon,
    notification,
    Calendar,
    message,
    Spin,
    Switch,
    Carousel, Slider, Select, Badge, Form, Collapse,
    Tag,
    Alert,
} from "antd";

import { connect } from "react-redux";

import { AddPhotoAC, AddUserAC, AddUsersDashBoard } from "../redux/action";

const { Option } = Select;
const { Panel } = Collapse;
const openNotification = (placement, icon, title, message) => {
    notification.open({
        message: title,
        description:
        message,
        placement,
        icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
        duration: 3
    });
};


function onPanelChange(value, mode) {
    console.log(value, mode);
}

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalUser: null,
            loading: false,

            visibleSort: false,

            showLongWork: true,
            showShortWork: true,

            minTime: 0,
            maxTime: 50000,

            visible: false,
            visible2: false,
            // isRedirect: false,
            usersLength: null,
        };
    }

    showModal = user => {

        this.setState({
            modalUser: {
                // id: user.id,
                // about: user.plane.about,
                where_to: user.where_to,
                where_from: user.where_from,
                flight_time: user.flight_time,
                time_of_departure: user.time_of_departure,
                time_of_arrival: user.time_of_arrival,
                level_flights: user.level_flights,
                city_photo: user.city_photo,
                airport_name: user.airport_name,
            },
            visible: true
        });
    };

    showSort = () => {

        this.setState({
            visibleSort: true
        });
    };

    async componentDidMount() {

        const reqUsersLength = await fetch("/api/usersLength", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        let usersLength = await reqUsersLength.json();


        this.setState({ usersLength: usersLength.usersLength });


        if (this.props.users.length === 0) {
            this.setState({ loading: true });
        }

        const response = await fetch('/api/profilePilot', {
            headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json();
        console.log(result);
        if (result.response !== 'fail') {

            await this.props.addUser(result.response);


        }

        console.log('есть', this.props.user)

        const reqComparison = await fetch("/api/getAllFly", {

            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: this.props.user.id
            })
        });
        let users = await reqComparison.json();


        this.setState({ loading: false });

        this.props.AddUsersDashBoard(users);
        console.log("есть ", users, this.props.users, this.props.users.response);

    }

    onChangeLongWork = (checked) => {
        this.setState({ showLongWork: checked })
    };

    onChangeShortWork = (checked) => {
        this.setState({ showShortWork: checked })
    };

    onChangeTime = value => {
        this.setState({
            minPrice: value[0],
            maxPrice: value[1],
        });
    };


    filterTime = (time) => {
        return this.state.minTime <= time && time <= this.state.maxTime;
    };

    tryam = () => {
        this.setState({
            visible2: true,
        });

    }

    changeDirection = (s) => {
        message.info("Направление: " + s, 4)
    }

    changeDuration = (s) => {
        message.info("Продолжительность рабочей смены: " + s, 4)
    }

    changeWork = (s) => {
        message.info("Желание дополнительной подработки: " + s, 4)
    }

    changeDepartTime = (s) => {
        message.info("Предпочтительное время вылета: " + s, 4)
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel2 = e => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    };

    handleCancel3 = () => {

        this.setState({
            visibleSort: false,
        });
    };

    ym = () => {
        return (
            "<script src='https://mc.yandex.ru/metrika/watch.js' type='text/javascript'></script>\
            <script type='text/javascript'>\
                  try {\
                        var yaCounter57428827 = new Ya.Metrika({\
                        id:57428827,\
                        clickmap:true,\
                        trackLinks:true,\
                        accurateTrackBounce:true,\
                        webvisor:true,\
                        trackHash:true\
                        });\
                  } catch(e) {console.log('error') }\
            </script>"
        );
    };

    render() {
        const { TabPane } = Tabs;
        const { cities } = this.state;
        const userMainInfo = JSON.parse(localStorage.getItem('userMainInfo'));
        let searchFlag;
        let blueCircle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAE/ElEQVRoge2ZTWhcVRTH/+dmMklLI5KmaJp0IdokGjRgBrtucROlYBZDQ6PiQiIlKahbEabg10ZF7IQ2anGRgG1cKPixkdClhpkUlagJ1EUbU7VNEDMkZua9e1zM15v37n33vpnEjbkw5OUe3tzf/5xzz7nvDbA39sb/e9BOfEkyeaUJsQceY+LjDAxKoA9AJxMdYAAM5BhYBbAkibKS5dyxo4/Op1IkG127IQEjI/NHHIhxJnoahK4SLJgI1WvfX1D5eoVB000upb+eGVj5TwUkkwuHZBO/RoTnmBCPCO6bR56ILjlx59WrU4k7uy4gOZI5zSTeZ+L2RsBRuS7baQ2MiasfD3yyKwLGxjLN6xtikomfDwUPgFXnYLAzAGZc3Gp2zmanEoUdE3DyZGZ/vI0+ZWAoKjgshPkdIglfFUQhmZ1KbDYsYGws07yWo88lMLTb4DUpRvgm91fsycXZ/nwYnzAJuJ0Tky7RkCSCBCCp9KlcU+njAdDYg/eXbN756v2P77vbec/EFxqB4dPXRiXxdJjHgZCIeOfNHlfaQTSycPHhy5EFDD/73UHXbf6FCR1+sGB61AcOC2FMWI/JfG9WU2K1KeTI+BuS0FEOr9fr2lQC1aSCKlXKKcYWqVS0U/u2aDkXKQJDo993C3Kvo9KkSONRO4/DYLcoCnlyxdHFqf4bVhEQTe4EE+JFj5LCo2aPV+D89+k87v1ez6YvRSvuxviMktU/kUqxkEyj9YAXF6vU8mDlsQTXVLNnkLzSZBTw7a/XjklCtxG8NF9dTG23BfemmFoYd913b/+gUYALOm4Cr92I9YOzBzzUYaU5Ypzw88b8E5KQgGJzwnOt3Lw1dv3mBBooCgKBCAQEMFGP+vBVP3i1bzRYzQi9FgLQqWgm4eAasB0Dr853GgVI4ICyVluCw2C3BQ9Ev3jdZhbgTwcL8OBiEcC94i1S1EIA5RhoN4Grz0PRwWGw+/bWhk0EbjHQrgIDNAvozvoaMBjsuqIggVtGAQxalsT9ZTClp+sAh8FuU82YaMnPG2hkDjhT+ZJAY6qcENUPKb4GFOiu/gblvx/qxldtnJwxRkACc+TfwBE8ro9Y49VMspgzRmCh+5F5SbgZxeMVgIBHLT1e+j94Hqqx3/i7rSdrFIAUSUmYCQX3elUJVnu6DANnD7hOmCTAZcxA8SpS+TzADqclUd6/cCXENg/qIeA1h0EdOGru35auSKtYlQJ++HBgRQKXgmGtH5w94KGppEhRCfHB1ru9v1kLAADKi1cYuON/2IgCrqxmkcAJkrAWc3FOx6kVsPhR/7okOmv9TkcBHvKgbgNejtaZjbd7tS99SWcoj/vHf7zAgl4IHO5Qm14w2Ospw1JwuvDmgxNhfMY3c9f//Hlcgj9TPV3VVpD6Pa4qw0z8ZaHl9xdNfMYIAMDhscz+WOu+WUl4Agi09+geL62st9MXTmvbKaQOG1/uGiMAAKtTic1D/2w9xcAF7R6w8LhlGU47ravDNvAlP0Qb97z80ykwzjPQoTwy++ZgsHsieRvM4+5bfbNReKwi4B1/vPPQ5Vie+lhgUgLbqjIb7K6hHt+WROfdFqcvKjzQ4I98B19a6nKEnADRKMBHbCLi8fhNJkxLQhqvq5vUrguojBSLuzaXE8zyhEsYBKiXi79aFn9mFcgxY4UZy5KQkaA5tPZkVWebvbE39ka08S8oPLE2P4bQtwAAAABJRU5ErkJggg==";
        let redCircle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADXElEQVRoge2Zz2scZRzGn+edLWxQCV6sFVupihuvdv+CeBdiy0JrkpKLaCx6KD2IDb7QioJS2qIN1UNpFwUXTcS78Q8w7dXUQ0qrqDnVHxUHdud9PDQ9OPPuzryT3Wmg+Ry/7/fd+TzMzM7M+wI77PBgw2H8iKw12F9rgpgUXBPgcwCeBPDQZss/AH4BcZ3iVQgruNFbpbVuq8feUgC139vj5N4gMAtgb+D0WwLahuYTzrzzW1mHUgH0+fuPuqRrCb4KoF724JvEgj41iXuXc/aP0MnBAXTl1MsCFgE8Fjo3hw0C85xdWAqZVDiAOp3IxWtnCL4Z7lYcCefMWOM4W62kSH+hALpk66qZLyBObU2vINQye+4I52yc12ryGtTpRKpF7crkAUCckom+1Pe2lteaG8DFa2cgHBqOWQDES+5n82F+2wA2b9ivh2cVjCge5NGTy/0a+gZQ54Nxxd0fAewZiVpxNhjVnucrb9/2Dfa9hFzcPYX7Lw8Au13Stf0GvWdAl+zjiqJ1AGOjsgok5q7kGR62v6YHvGfARdExbB95AKi7bjTvG8gEkLWGwMzoncIgMC1rM77ZM7C/1gSwrwqpQJ7C07UX0sVsAOrFSnTKMZkuZC8h6EA1LuEIaqZrnpuYjSpkSjKRLvj+hZ6oQKQsmeeSL8DDFYiU5ZF0IfdlbrvjC3Cncovi/J0u+AJkHtfbiMzHvyeArldhUpK1dCETgODValzCIbiarmXPgPhdJTblWEkXsgFu9FYB3KrCJpCbWO9dSxezl5C1TkC7GqfiCGr7liK9zwGTJB8D+HfkVsWJzS636BvwBuCc/V3QZ6N1Ko6Ei76vMWDAk9gYtwDP/+59YMO4xPYb7BuA0/YvAscAaBRWBRGJ1wYt+g58F+LswpKE88P3KoaAs5xZ+GZQT+7LnBlrHAfx1fC0CiJ8a+qNE3ltuQHYaiW8PT4Nqu/q2AhY4p/jrSIr1KHL6x8RfCtkXiAScNbUGyeGurz+vyNcPj0lahHA7mC9wWxQfH3QOqiP4A8aHj25zCSZEHQeQO76fQFiCeeYJBOh8sBQNvmSeYKzCF9LuimobRhdqHyTL42sNXjWHIA4KaAJ4d42673v6zu4u836E8UfAKxgvXdtGNusO+zwoPMfinkPENdCPQgAAAAASUVORK5CYII=";
        let greenCircle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADlUlEQVRoge2ZTWwbRRiG33e3sWM7Fe6FUtQSVaghXGjSWogr4Y4UfnIo/ZGFhCBUuVQcEStxRCptBFSFQ4QsQESQIO6kd3BLygWKEVV/BOTUiLrxrirPy4FISLtr745jL5Ga5/jNN97nkz3emW+AHXZ4sGE/PsSTnIOtqxVDMwU6FciMgdwPobT5lHuQbpO8JumyI2fleuFw3SPNVp+9pQJq9+r77jvum4ROAjxgOf2mgNqQaX94olT5s1eHngr4bP2nPUHOeCReAzTc68M3FXwJHzPQO9U9k+vWs20nLGysvgDqAoCHbecmsAZxtlqcWLKZlLqARS26zdbYWVJz9m4WCOdLhcaZGc6006SnKmBBl4YVlD+nML01u3SIWGZ+/ViVz/pJuU5SwqIWXQblWlbyAEBhWq3yl54u7UrKTSyg2Ro7K+Gl/qilh8Tzo0H5vcS8boObC/br/mlZI0d88VRxYrlTQscCLqr+UM53fwawbyBq6VnLBe6Tr5SfuhM32PEnlGvtehf/vzwA7A1yxus0GPsNLDS/fwTu0O8ACoOysoO+MebxV0tH/giPxH4DcodOY9vIA4CG6XA2biRSgCc5BE4MXsoOAsc9KeIbCRxsXa0AeCwTKztGD2z8eCQcjBTQpp7Lxscel5wKxyIFkDyajY49clAJx6IFSE9ko9MD0ng4FClAwKPZ2NhDMPJeivsbHcnApScE7A7HEjdz2524ApqZW6SEwN1wLLqIgcjrersgKHL4jy5i8lo2Oj1A/hIORQuQLmdjYw8N6uFYpABX/C4bHXva0ko4FingeuFwHcDNTIzsuHGrOHklHIzuRkkjoJaNU3oI1eJakbHvAbbvfwCgNXCr1NBvG1yIG4ktoDry9F8SPxmslAXSxbjTGNDtTFzw3wbQc9O1j6whgNdpsGMBx/nM3xBPA9AgrFIiGLzerenbdS9ULU4sQZjvv1c6SJyrlia/6ZaTuJkrFRpnSHzVP610SPi2mG+8lZSXqrk7r0Z+JGh+kVl/lFq6m999bI6HgqTUVNvpOR4KRvKNl0Gcw2DXhEi8X8r/NpNGHujhguPTjdVp8+8Fx15rve6sOeIb3fqgcVgfaE4VJ5bhY1ziPMDE/n0y9CGch49xW3mgD5d8bceZFXgS9r2kG4RqrjEfZX7JF8aTnNGN1aMgp+ioIoMxEPvx3/m6CeE2HfwKgx/a0sqt4uSVflyz7rDDg84/KB4mhRttl6cAAAAASUVORK5CYII=";
        return (


            <div>
                {(this.state.loading || !this.props.users) && (
                    <div style={{ textAlign: "center", marginTop: '10px' }}>
                        <Spin size="small" tip="Загрузка..." />
                    </div>
                )}

                {this.state.visibleSort === true && (
                    <div className='modalWidth'>
                        <Modal
                            width='700px'
                            title="Фильтрация полетов"
                            visible={this.state.visibleSort}
                            onCancel={this.handleCancel3}

                            footer={[

                            ]}
                        >
                            <div style={{ textAlign: 'center' }} >
                                <div className="dashBoardContainerMoreFiltres">
                                    <div className="dashBoardContentMoreFiltres">
                                        <Card size="small" title="Длительность смены"
                                              className="userCardFilter"
                                        >
                                            <div style={{ textAlign: "left" }}>
                                                <Switch defaultChecked onChange={this.onChangeLongWork} /> Трансатлантические рейсы
                                            </div>
                                            <div style={{ textAlign: "left" }}>
                                                <Switch defaultChecked onChange={this.onChangeShortWork} /> Короткие разворотные рейсы
                                            </div>

                                        </Card>
                                        <Card size="small" title="Время полета" className="userCardFilter">
                                            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 'auto' }}>
                                                <Slider range value={[this.state.minPrice, this.state.maxPrice]} max={24}
                                                        onChange={this.onChangeTime}
                                                        defaultValue={[this.state.minTime, this.state.maxTime]}
                                                        marks={{ 0: 'ч', 24: 'ч.' }} />
                                            </div>
                                        </Card>

                                        <Card size="small" title="Время полета" className="userCardFilter">
                                            <div style={{ textAlign: "left" }}>
                                                <Switch defaultChecked onChange={this.onChangeMorning} /> Утро
                                            </div>
                                            <div style={{ textAlign: "left" }}>
                                                <Switch defaultChecked onChange={this.onChangeDay} /> День
                                            </div>

                                        </Card>

                                        <Card size="small" title="Время полета" className="userCardFilter">
                                            <div style={{ textAlign: "left" }}>
                                                <Switch defaultChecked onChange={this.onChangeEvening} /> Вечер
                                            </div>
                                            <div style={{ textAlign: "left" }}>
                                                <Switch defaultChecked onChange={this.onChangeNight} /> Ночь
                                            </div>

                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                )}

                {/* </Collapse> */}


                <div className="dashBoardContainer">

                    <div className="dashBoardContent">

                        <div className='yourTrip'> <font face="Arial Black" >Заявка на текущий период:</font> </div>

                        <Card color="primary" className="userCardW shadow-sm" bordered={true}>
                                <img src={blueCircle} style={{width:"30px", position: "absolute", top: "15px", left: "15px"}}></img>
                                <div className='TitleText' style={{position: "absolute", top: "25px", left: "50px"}}>
                                    <font face="Arial" color={"#0a0a0a"}>Октябрь</font>
                                </div>
                                <div className="mediumText" color={"#989191"} style={{position: "absolute", bottom: "15px", left: "20px"}}>Статус заявки</div>
                                <div style={{ width: "80%", float: "right", marginRight: "50px"}}>
                                    <div className="userCard1" style={{ width: '70%'}}>
                                        {(!this.props.user.wishForm &&
                                            <div className='greyMediumText' style={{ marginLeft: "100px"}}> <font face="Arial Black" >Не заполнена</font> </div>) ||
                                        (this.props.user.wishForm &&
                                            <div style={{ marginLeft: "100px"}}><font face="Arial" color={"#ffffff"} size={5} >Тайтл заявки?</font></div>)}
                                    </div>
                                        {this.props.user.wishForm &&
                                        this.props.user.wishForm.map((user, key) =>
                                            <div>
                                                <Buttonr onClick={() => this.changeDirection(user.longFly)} color="none" className="userCardWP hoverCard shadow-lg">
                                                    <font color={"#5a5a5a"}>Направление: {user.longFly}</font>
                                                </Buttonr>

                                                <Buttonr onClick={() => this.changeDuration(user.timeFly)} color="none" className="userCardWP hoverCard shadow-lg">
                                                    <font color={"#5a5a5a"}>Продолжительность рабочей смены: {user.timeFly}</font>
                                                </Buttonr>

                                                <Buttonr onClick={() => this.changeWork(user.otherTime)} color="none" className="userCardWP hoverCard shadow-lg">
                                                    <font color={"#5a5a5a"}>Желание дополнительной подработки: {user.otherTime}</font>
                                                </Buttonr>

                                                <Buttonr onClick={() => this.changeDepartTime(user.preferenceTimeFly)} color="none" className="userCardWP hoverCard shadow-lg">
                                                    <font color={"#5a5a5a"}>Предпочтительное время вылета: {user.preferenceTimeFly}</font>
                                                </Buttonr>
                                            </div>
                                        )}
                                </div>
                                    <Buttonr close style={{position: "absolute", top: "15px", right: "15px"}}/>
                                    <div className='settings-icon' style={{position: "absolute", bottom: "15px", right: "15px"}}>
                                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <path
                                                    d="M10.0608 0H8.93802C7.59503 0 6.50523 1.01931 6.4612 2.32833V2.36052C6.45019 2.55365 6.34011 2.71459 6.15297 2.80043C5.66861 3.01502 5.20627 3.27253 4.77696 3.57296C4.61183 3.69099 4.40268 3.70172 4.23756 3.61588L4.21554 3.60515C3.02667 2.99356 1.5736 3.39056 0.902101 4.5279L0.329679 5.4721C-0.341816 6.60944 0.0214521 8.03648 1.1663 8.72318C1.33142 8.81974 1.41948 9.00215 1.39747 9.20601C1.37545 9.46352 1.35343 9.73176 1.35343 9.98927C1.35343 10.2468 1.36444 10.515 1.39747 10.7725C1.41948 10.9657 1.33142 11.1588 1.1663 11.2554C0.0324601 11.9635 -0.341816 13.3906 0.329679 14.5279L0.891093 15.4828C1.56259 16.6202 3.01566 17.0172 4.20453 16.4056L4.22655 16.3948C4.39167 16.309 4.60083 16.3197 4.76595 16.4378C5.19526 16.7382 5.6576 16.9957 6.14196 17.2103C6.3291 17.2961 6.45019 17.4571 6.45019 17.6502V17.6824C6.50523 18.9807 7.59503 20 8.93802 20H10.0608C11.4038 20 12.4936 18.9807 12.5377 17.6717V17.5966C12.5487 17.4142 12.6588 17.2425 12.8459 17.1567C13.3082 16.9528 13.7486 16.6953 14.1669 16.4056C14.332 16.2876 14.5411 16.2768 14.7173 16.3627L14.7943 16.4056C15.9832 17.0172 17.4363 16.6202 18.1078 15.4828L18.6692 14.5279C19.3407 13.3906 18.9774 11.9635 17.8326 11.2768L17.7335 11.2232C17.5684 11.1266 17.4803 10.9442 17.5023 10.7511C17.5243 10.5043 17.5354 10.2575 17.5354 10.0215C17.5354 9.78541 17.5243 9.5279 17.5023 9.29185C17.4803 9.09871 17.5684 8.91631 17.7335 8.81974L17.8326 8.76609C18.9664 8.06867 19.3407 6.64163 18.6692 5.51502L18.1078 4.56009C17.4363 3.42275 15.9832 3.02575 14.7943 3.63734L14.7173 3.68026C14.5411 3.76609 14.332 3.75537 14.1669 3.63734C13.7486 3.34764 13.3082 3.09013 12.8459 2.88627C12.6588 2.80043 12.5487 2.63948 12.5377 2.44635V2.37124C12.4936 1.01931 11.4038 0 10.0608 0ZM4.45772 4.84979C4.80998 4.84979 5.16224 4.74249 5.47047 4.5279C5.83373 4.27039 6.23003 4.05579 6.64833 3.87339C7.25378 3.60515 7.65007 3.03648 7.67209 2.40343V2.37124C7.6941 1.70601 8.25552 1.18026 8.93802 1.18026H10.0608C10.7434 1.18026 11.3048 1.70601 11.3268 2.37124V2.44635C11.3488 3.0794 11.7341 3.63734 12.3285 3.91631C12.7248 4.09871 13.0991 4.3133 13.4513 4.56009C13.9907 4.94635 14.6953 4.98927 15.2787 4.68884L15.3557 4.64592C15.9612 4.33476 16.6987 4.53863 17.051 5.11803L17.6124 6.07296C17.9537 6.65236 17.7665 7.38197 17.1831 7.73605L17.084 7.7897C16.5336 8.12232 16.2254 8.73391 16.2914 9.37768C16.3135 9.58154 16.3245 9.79614 16.3245 10C16.3245 10.2039 16.3135 10.4185 16.2914 10.6223C16.2254 11.2661 16.5336 11.8777 17.084 12.2103L17.1831 12.2639C17.7665 12.618 17.9537 13.3476 17.6124 13.927L17.051 14.882C16.7097 15.4614 15.9612 15.6652 15.3557 15.3541L15.2787 15.3112C14.6953 15.0107 14.0018 15.0536 13.4513 15.4399C13.0991 15.6867 12.7248 15.9013 12.3285 16.0837C11.7341 16.3519 11.3488 16.9206 11.3268 17.5536V17.6288C11.3048 18.294 10.7544 18.8197 10.0608 18.8197H8.93802C8.25552 18.8197 7.6941 18.294 7.67209 17.6288V17.5966C7.65007 16.9528 7.25378 16.3841 6.64833 16.1266C6.24103 15.9442 5.84474 15.7296 5.47047 15.4721C4.93107 15.0966 4.23756 15.0536 3.65413 15.3541L3.63211 15.3648C3.02667 15.676 2.28912 15.4721 1.93686 14.8927L1.37545 13.9378C1.0342 13.3584 1.22134 12.6288 1.80477 12.2747C2.36618 11.9313 2.67441 11.3197 2.59735 10.676C2.57533 10.4506 2.56433 10.2253 2.56433 10.0107C2.56433 9.79614 2.57533 9.56009 2.59735 9.34549C2.6634 8.70172 2.35517 8.0794 1.80477 7.74678C1.22134 7.3927 1.0342 6.66309 1.37545 6.08369L1.93686 5.12875C2.27811 4.54936 3.02667 4.34549 3.63211 4.65665L3.65413 4.66738C3.90732 4.78541 4.18252 4.84979 4.45772 4.84979Z"
                                                    fill="#282828"/>
                                                <path
                                                    d="M9.45595 5.60085C11.9486 5.60085 13.9693 7.57042 13.9693 10C13.9693 12.4296 11.9486 14.3991 9.45595 14.3991C6.96331 14.3991 4.94263 12.4296 4.94263 10C4.94263 7.57042 6.96331 5.60085 9.45595 5.60085Z"
                                                    fill="#5459CD"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="19" height="20" fill="white"
                                                          transform="matrix(1 0 0 -1 0 20)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                            </Card>

                        <div className='mediumText'> <font face="Arial Black" >История заявок:</font> </div>

                        <Card color="primary" className="userCardW shadow-sm" bordered={true}>
                            <img src={redCircle} style={{width:"30px", position: "absolute", top: "15px", left: "15px"}}></img>
                            <div className='TitleText' style={{position: "absolute", top: "25px", left: "50px"}}>
                                <font face="Arial" color={"#0a0a0a"}>Сентябрь</font>
                            </div>
                            <div className="mediumText" color={"#989191"} style={{position: "absolute", bottom: "15px", left: "20px"}}>Статус заявки</div>
                            <div style={{ width: "80%", float: "right", marginRight: "50px"}}>
                                <div className="userCard1" style={{ width: '70%'}}>
                                    {(!this.props.user.wishForm &&
                                        <div className='greyMediumText' style={{ marginLeft: "100px"}}> <font face="Arial Black" >Не заполнена</font> </div>) ||
                                    (this.props.user.wishForm &&
                                        <div style={{ marginLeft: "100px"}}><font face="Arial" color={"#ffffff"} size={5} >Тайтл заявки?</font></div>)}
                                </div>
                                {this.props.user.wishForm &&
                                this.props.user.wishForm.map((user, key) =>
                                    <div>
                                        <Buttonr color="none" id="form2_toggler1" className="userCardRed hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Направление: Короткие разворотные рейсы</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form2_toggler1">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Короткие разворотные рейсы
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>

                                        <Buttonr color="none" id="form2_toggler2" className="userCardRed hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Продолжительность рабочей смены: Длительная смена</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form2_toggler2">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Длительная смена
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>

                                        <Buttonr color="none" id="form2_toggler3" className="userCardRed hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Желание дополнительной подработки: Хочу работать с переработками</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form2_toggler3">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Хочу работать с переработками
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>

                                        <Buttonr color="none" id="form2_toggler4" className="userCardGreen hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Предпочтительное время вылета: Ночь</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form2_toggler4">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Ночь
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>
                                    </div>
                                )}
                            </div>

                        </Card>

                        <Card color="primary" className="userCardW shadow-sm" bordered={true}>
                            <img src={greenCircle} style={{width:"30px", position: "absolute", top: "15px", left: "15px"}}></img>
                            <div className='TitleText' style={{position: "absolute", top: "25px", left: "50px"}}>
                                <font face="Arial" color={"#0a0a0a"}>Август</font>
                            </div>
                            <div className="mediumText" color={"#989191"} style={{position: "absolute", bottom: "15px", left: "20px"}}>Статус заявки</div>
                            <div style={{ width: "80%", float: "right", marginRight: "50px"}}>
                                <div className="userCard1" style={{ width: '70%'}}>
                                    {(!this.props.user.wishForm &&
                                        <div className='greyMediumText' style={{ marginLeft: "100px"}}> <font face="Arial Black" >Не заполнена</font> </div>) ||
                                    (this.props.user.wishForm &&
                                        <div style={{ marginLeft: "100px"}}><font face="Arial" color={"#ffffff"} size={5} >Тайтл заявки?</font></div>)}
                                </div>
                                {this.props.user.wishForm &&
                                this.props.user.wishForm.map((user, key) =>
                                    <div>
                                        <Buttonr color="none" id="form3_toggler1" className="userCardGreen hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Направление: Короткие разворотные рейсы</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form3_toggler1">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Короткие разворотные рейсы
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>

                                        <Buttonr color="none" id="form3_toggler2" className="userCardGreen hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Продолжительность рабочей смены: Длительная смена</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form3_toggler2">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Длительная смена
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>

                                        <Buttonr color="none" id="form3_toggler3" className="userCardGreen hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Желание дополнительной подработки: Хочу работать с переработками</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form3_toggler3">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Хочу работать с переработками
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>

                                        <Buttonr color="none" id="form3_toggler4" className="userCardRed hoverCard shadow-lg">
                                            <font color={"#5a5a5a"}>Предпочтительное время вылета: Ночь</font>
                                        </Buttonr>
                                        <UncontrolledCollapse toggler="#form3_toggler4">
                                            <Cardr className="userCardW">
                                                <CardBody>
                                                    Ночь
                                                </CardBody>
                                            </Cardr>
                                        </UncontrolledCollapse>
                                    </div>
                                )}
                            </div>

                        </Card>

                        {/*логика отрисовки текущей заявки пользователя*/}
                        {/*<Card width='100%'
                              className="userCardW hoverCard"
                              title="Заявка на октябрь 2020 г."
                              bordered={false} style={{ width: 300 }}
                        >


                            {this.props.user.wishForm &&


                            this.props.user.wishForm.map((user, key) =>
                                <h3 style={{ float: "left" }}>

                                    <div>
                                        <h5 style={{ float: "left" }}>
                                            Направление
                                        </h5>
                                        <h3 style={{ float: "left", color: 'blue' }}>
                                            {user.longFly}
                                        </h3>

                                        <h5 style={{ float: "left" }}>
                                            Продолжительность рабочей смены
                                        </h5>
                                        <h3 style={{ float: "left", color: 'blue' }}>
                                            {user.timeFly}
                                        </h3>

                                        <h5 style={{ float: "left" }}>
                                            Желание дополнительной подработки
                                        </h5>

                                        <h3 style={{ float: "left", color: 'blue' }}>
                                            {user.otherTime}
                                        </h3>

                                        <h5 style={{ float: "left" }}>
                                            Предпочтительное время вылета
                                        </h5>
                                        <h3 style={{ float: "left", color: 'blue' }}>
                                            {user.preferenceTimeFly}
                                        </h3>
                                    </div>
                                </h3>
                            )}
                        </Card>*/}

                    </div>

                    {this.state.modalUser && (
                        <div className='modalWidth'>
                            <Modal

                                title="Детали полета"
                                visible={this.state.visible2}
                                onCancel={this.handleCancel2}

                                footer={[

                                ]}
                            >
                                <div style={{ textAlign: 'center' }} >
                                    Детальная информация по полету
                                </div>
                            </Modal>
                        </div>
                    )}

                    {this.state.modalUser && (
                        <Modal
                            width='550px'
                            title="Детальная информация по полету"

                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={[
                                <div style={{ height: 60 }}>
                                    <Icon
                                        type="close-circle"
                                        style={{ fontSize: "62px", float: "left" }}
                                        onClick={this.handleCancel}
                                    />
                                    <img style={{ width: '130px' }} src={logo} alt="" />
                                    <Icon
                                        type="heart"
                                        theme="twoTone"
                                        twoToneColor="#eb2f96"
                                        style={{ fontSize: "62px", float: "right" }}
                                        onClick={this.isLike}
                                    />
                                </div>
                            ]}
                        >
                            <div style={{ textAlign: 'center' }} onClick={() => this.tryam()} >
                                {/* <Carousel autoplay>
                                    {this.state.modalUser.foto.map((f, i) =>
                                        <div key={i}>
                                            <Avatar size={180} src={f} />
                                        </div>
                                    )}
                                </Carousel> */}
                            </div>

                            <p>
                                <div style={{ height: '40%' }}>
                                    <div className="card-container">
                                        <br />
                                        <Tag color="green">
                                            <div style={{ color: 'black', fontSize: '32px' }}>
                                                Маршрут: {this.state.modalUser.where_from} - {this.state.modalUser.where_to}
                                            </div>
                                        </Tag>
                                        <br />
                                        <Tabs type="card">
                                            <TabPane tab="Общая информация" key="1">
                                                <p>
                                                </p>
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Информация
                                                        </div>

                                                    </p>
                                                } type="info" />
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Заголовок</div>
                                                        <div className={'fontModal'}>Информация
                                                        </div>

                                                    </p>
                                                } type="info" />
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Заголовок</div>
                                                        <div
                                                            className={'fontModal'}>Информация
                                                        </div>
                                                    </p>
                                                } type="info" />
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Заголовок</div>
                                                        <div
                                                            className={'fontModal'}>Информация</div>
                                                    </p>
                                                } type="info" />
                                            </TabPane>
                                            <TabPane tab="Детали" key="2">
                                                <p>
                                                </p>
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Информация
                                                        </div>

                                                    </p>
                                                } type="info" />
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Заголовок</div>
                                                        <div className={'fontModal'}>Информация
                                                        </div>

                                                    </p>
                                                } type="info" />
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Заголовок</div>
                                                        <div
                                                            className={'fontModal'}>Информация
                                                        </div>
                                                    </p>
                                                } type="info" />
                                                <Alert message={
                                                    <p>
                                                        <div style={{ color: 'black' }}>Заголовок</div>
                                                        <div
                                                            className={'fontModal'}>Информация</div>
                                                    </p>
                                                } type="info" />
                                            </TabPane>

                                        </Tabs>
                                    </div>
                                    {document.getElementById('container')}
                                </div>

                            </p>
                        </Modal>

                    )}

                    <div className='rightBar'>

                        <div className="site-card-border-less-wrapper">

                            <div className="site-calendar-demo-card" style={{ backgroundColor: '#F6F9FE' }}>
                                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                            </div>
                            <div className='yourTrip'> <font face="Arial Black" >Ваши Рейсы</font> </div>
                            <div className="userCardW">
                            <Card className='sUserCard hoverCard' onClick={() => this.showSort()}> <font className="sortString" face="Arial Black" ><font face="Arial Black" color={"#615d73"} >Сортировка</font></font></Card>
                                <Suspense fallback={<h1>Loading posts...</h1>}>
                                    {this.props.users.response &&

                                    this.props.users.response.map((user, i) => {

                                        // if (this.filterPrise(user.time)) {
                                        if (user.city_photo) {

                                            console.log(user)

                                            let srcImg;
                                            if (!user.city_photo) {
                                                srcImg = user.city_photo;
                                            } else {
                                                srcImg = plane;
                                            }

                                            let styl, depart, land;
                                            let landing_blue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABmJLR0QA/wD/AP+gvaeTAAACeklEQVQ4jc2U309SYRjHn/ecQ6mAB0UOIOhOxQgRNb1Q07Vps5lrq4tcG2Nr3XnVTWtr6x/oH+imy26iq7ZuWpu2fm4unWL+gB1JzAGCASoECBw4bxcUHPklbV703Lzb+7zP532e7/s8L5q2LsFpGHEqlD8gMxvpM4RLHB3ML4M+itC/gIydh49si6qWpNhBSzNPZr48ffCeUSSrxJaBCMASSrBd48QOztvCZwlGkbROcFViy0ApngKAEcuuqfOg4OCzhNvXAgCjvQFWG6sPlCEBACGwTboIkfprHiUAIITvXHWfCCLNPTNaZfKyJQAAbXTq+tCOTpXAAOFoUzAiPSPJKZtT59ujDrd6P9ZQA0QBwPq2MnTQlBdb3pQZH/COD3jTPOnYZBZc6hdzJr0q3ipPAdAnZJTmyc+rOk1rUq+KF28gsZ6JD5mDN0e3dKr4fqwxEms4SlPVQEjc2cPdAesE196WqHgUY+T20wtOzYJLHQjLaoEAgCTwlT7/5OCOQX9YoxDvT/miS/3pm84fklUGFYzVRG2T3CVDqAYOY/Rmnn3+tgtjVHXWOtTxbjZSgwIACOEbI9v3ppxQcWgRgulx9/3bKxJKKGwKAnxw6J+97lnmGD57LGpqeEfTmih9BYoUZm6tjfX7RPnDV6f25TtjXo6xfp8/JHv10TBo3uu9EGqWZrYDzYmU5BhI2sg/tC5ZzhUrWvmuss9e9OzSYu5Rmprf0M5vaAGAJHBOQCAWm1EkH99d1P1tpU2fwj5rWvcoa8tULCW/nJXkCpQfQdo+Z1zmmDoReStmRBK4i90nCby6pcS47g+tJCMAyAmo/kLK7VT/7P8L9BvboetBm/GZ3QAAAABJRU5ErkJggg==";
                                            let landing_purple = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABmJLR0QA/wD/AP+gvaeTAAACaklEQVQ4jc2U309SYRjHn/f1QCmRIBwGQnlUGHkQlblJtraMEGutH5s31szL1mXrvq3/oeuuXeum2lwtQEc31XILiuMJUCxhSAKGuEzieE4XODkinU6bF33v3vd59tn3ed7nedH9CQEOQ/hQKLsgivpqtSbrAgZDzmLJIPQvoBMd6ZuTjzXaojigOvbj9p1Hd+891O6/lwIhEAiCGx2dFQdSKxaOI7Ta4gXvnFxQpaIEgF4nc7IjtRfgOCKdNgOAs48xmr7JApXLSgBACHy+IMa1R0wmKQBASPB4Qn8FNZ3rfaDTrTt6WQBo1ZSG3POkvgCANjZa1wtthKLSenzT1L66mLCVSmoJEAEAy8tU8bum2uyWli3XYNg1GP5VUSTiVpa1B/weA5lXqzelHaHqQKpUW1euztCOzwczeB6lUxaGoZloj4QpJJ5s2sF6vXN6stAwVRBQOt3OLpxiWXshr5MCAQDGfF//J7d73mzJSBSytkayC/aPEWcup28M2pPRmPWNzVptSxI4QUBv3wy9fDEqCOiPu2Yw5qjOLxIUAEBIGD7z7uKlV9BwaRGCEc/r8fGnBLGzd8nzKPyh//mzy/GYjeMIcf7p4fdtunWijtLUtHPt+syAKyLyD+xCTzAwUm3HgCuSz+lCobM0HevqTqpUW9lV4/bPo/tAzc3bEzeedHbVKlpMdAf85zMZk4iLyuUjTJRmojQAYMzzPAZxs7Xa4uTUNEnmq8dUyhz0e6pbIke7jpSKyq2paT2ZB4Bs1hjwj8RjNpmIqmqOMOYpagVjfmmpUxBkf2h1jgCA57H8Qg7qUP/s/wv0G9EW5yQKXtQFAAAAAElFTkSuQmCC";
                                            let depart_blue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABmJLR0QA/wD/AP+gvaeTAAACUUlEQVQ4jc2UXW/SYBTHzwNF3UbpoGsoLw60cxqmqJkhW7KNGS92N7f5Fj+Bt+5r+AH8BBovvFiyi10Yo0uEjLgxsDI3KWVhoYAB9wJDysuoFyULlm7owoXnqj3Pv7/nPP+n56CHT4PQidB0hPJfgrAzf2nExZsDOX1XNbvfFYmTSpARF6fH4m4mF+YoH2vbThtaERayODPOT9wSMG1dzghZvRI0ej0z5UnosHq/uTA9Fheyen/E6metqVwPADjo/OwEPzqU0vxpiZDrUYKWVpxhjno2w7ocuwBAk0WKKEkSXLHvz3ljw1d/IKQs8PM3+uWCG6n+RwjBveEdB51f9DFm469Zb8zN5BQaSYJg1LywPBBN9sJJZksSvF/rdzO5549Dgxf3WlbRepR6+3GQF4jjJPZgknPShcAGvf7dXKpoAQAhacSVmZvknfSB6jav3l1b9F1WJDEuaXx0lxsZSldrmi88xe30em8nrX1FVYRcjp+1tOa1pG1eyOo9rgymlax9xRvMT7y72qwoV7WJjMFkKMuvmwlyKXCpFYQBwMqGpfYGzT8J6bB6084QTxHLIfsn1jblSTC2xjF9rFW10obZq1v0i9d37o/zlZpGyOq30wTLUweH5+RV0iDKD7UjTSCici5ovrVwjArHKFURSZSONYWSTlXzV01LEg2DVG3+B5AJLwFAuaJd2zKfHaTD6nh3BQBWN81i5cRp0R5kwkW5v3xfbafI2s8jEyHWjjQfgvYwp34Vcqg3bXMY8TJC0m7+wumy9hXtFc631UAHZ/ZvaYTXa4YHSp4AAAAASUVORK5CYII=";
                                            let depart_purple = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABmJLR0QA/wD/AP+gvaeTAAACO0lEQVQ4jc2UQW/SYBjHn5e+WzJmYZMaimyRUBxCWUaiwahQyHZWb84v44fwOxhv6sWTHiQDZIdNhQ46ug7cgAGWTQdkc4xaD53LhApKOPic3v777+/5p0+foiePVRhFGUZC+S9BeOgnSbLJuPLGie/fDs35bUc3iCSb90JJhilsiQyf9lUqdC/CYjkIcYkFP08QiqbUZaobxPqEQGAd447V+iUYStZliudZnmfrsgUArHSN4xKsL2sw/DZruW7pBq0mA5LEPHj42uHYBYBpy8GU+VD9gWZmylwk7naLCHUHFLI3Xr28j3S/I4Tg5q0PVrqWiN2dvvyV4+KMq9DlUVUQxbmVaLBYtAOAPkgrxlVYXIrOzpZ6EEjMuaLvwuWy7VzE4UiMttWyGY+Yu35yMg4ACKleVghHEjRd1W3w9s1SPHanS8Slkj2yuMKyQqeDt7edxV2735+mruz/KaaqonSK7dWJ+atP6zLl8eYwoVDUvpP5bJw8vuhon45Vq1aTqaVd7uxcW00GekEYADIbXkUhHi2/wFi50Bn29myfPi6kU/OB22t2e0XT+ZRPN+nZ+DcF9/Nny0HufaeDZZmqVOi85Gy1JrW7JlNDOygKkdnw9AMBgCQxksToms5BksQcHU/oev5qac1TTe2g+5r/AUSSDQA4bY/lNueGB2GsGI1HACAI7nZ7fHgQSTa0/eJ5/Xmd9RsIMpmbikKsr/m3RP1RaNVv134laiGkNhpkf9vgRM3mpYEeGOE/+yep49ifb88TZgAAAABJRU5ErkJggg==";
                                            if (i % 2 == 0) {
                                                styl = "userCard hoverCard shadow-sm";
                                                depart = depart_purple;
                                                land = landing_purple;
                                            } else {
                                                styl = "userCard1 hoverCard shadow-sm";
                                                depart = depart_blue;
                                                land = landing_blue;
                                            }

                                            return (
                                                        <Card key={i}
                                                            onClick={() => this.showModal(user)}
                                                              className={styl}
                                                            // cover={
                                                            //     <img
                                                            //         style={{ borderRadius: "10px 10px 0px 0px" }}
                                                            //         alt="example"
                                                            //         src={srcImg}
                                                            //     />
                                                            // }

                                                        >


                                                            {/* <Alert style={{ background: 'white !important', width: '10%', height: '10%' }} message={
                                                            <p>
                                                                <div
                                                                    className={'fontModal'}>Информация
                                                        </div>
                                                            </p>
                                                        } type="info" /> */}
                                                                <div style={{ float: "left"}}>
                                                                    <Tag className="userCardW"><font size={5} color={"#5459cd"}><b>123456</b></font></Tag>
                                                                </div>
                                                                <div style={{ float: 'left'}}>
                                                                    <font size={4} color={"#ffffff"}>Отбытие</font> <br/>
                                                                    <img src={depart}></img>
                                                                    <font size={4} color={"#ffffff"} className="textRight">{user.time_of_departure}</font>
                                                                </div>
                                                                <div color={"#ffffff"} style={{width: "2px", height: "55px", float: "left"}} className="userCardW">
                                                                </div>
                                                                <div style={{ float: 'left'}}>
                                                                    <font size={4} color={"#ffffff"}>Прибытие</font> <br/>
                                                                    <img src={land} ></img>
                                                                    <font size={4} color={"#ffffff"} className="textRight">{user.time_of_arrival}</font>

                                                                </div>
                                                        </Card>
                                                );
                                        }
                                    })}
                                </Suspense>
                            </div>
                        </div>

                    </div>

                </div>

                {/* <div className="dashBoardContainer">

                    <div className="dashBoardContent">

                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>

                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>
                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>
                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>

                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>
                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>
                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>

                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>
                        <div className="site-card-border-less-wrapper">
                            <Card title="Рейс" bordered={false} style={{ width: 300 }}>
                                <p>Откуда: Москва</p>
                                <p>Куда: Париж</p>
                                <p>Дата: 25.08.2020</p>
                            </Card>
                        </div>

                    </div>


                    <div className="site-card-border-less-wrapper">
                        <div className="site-calendar-demo-card" style={{ backgroundColor: 'lightblue' }}>
                            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                        </div>
                        <Card title="Хотелки на ноябрь" bordered={false} style={{ width: 300 }}>
                            <p>Короткие полеты</p>
                            <p>Утром</p>
                            <p>В Рио-де-Жанейро</p>
                        </Card>
                        <Card title="Хотелки на октябрь" bordered={false} style={{ width: 300 }}>
                            <p>Длительные полеты</p>
                            <p>Вечером</p>
                            <p>В Хабаровск</p>
                        </Card>
                    </div>
                </div> */}



                <footer style={{ backgroundColor: '#4A76A8', color: '#ffffff', margin: '0 auto', width: "80%" }}
                        align={"center"}>
                    <p>Зарегистрировано пользователей IBMiX : {this.state.usersLength}</p>

                    <div dangerouslySetInnerHTML={{ __html: this.ym() }} />
                </footer>
            </div >



        );
    }
}

function mapStateToProps(store) {
    return {
        users: store.usersDashBoard,
        user: store.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addUser: user => {
            dispatch(AddUserAC(user));
        },
        addPhotos: photos => {
            dispatch(AddPhotoAC(photos))
        },
        AddUsersDashBoard: users => {
            dispatch(AddUsersDashBoard(users));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);