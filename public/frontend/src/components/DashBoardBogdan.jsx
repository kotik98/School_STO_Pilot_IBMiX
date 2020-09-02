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
    Button,
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

                            <Buttonr color="primary" id="toggler" className="userCard hoverCard" bordered={false}>
                                <div className='TitleText'> <font face="Arial" color={"#ffffff"}>Октябрь</font> </div>

                                {!this.props.user.wishForm &&
                                <div className='greyMediumText'> <font face="Arial Black" >Не заполнена</font> </div> }
                                <div className="mediumText" color={"#ffffff"}>
                                {this.props.user.wishForm &&
                                this.props.user.wishForm.map((user, key) =>
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
                                )}
                                </div>
                            </Buttonr>
                            <UncontrolledCollapse toggler="#toggler">
                                <Cardr style={{ border: 'none'}} className="userCard">
                                    <CardBody>
                                        <font color={"#ffffff"}>Супер подробная инфа</font>
                                    </CardBody>
                                </Cardr>
                            </UncontrolledCollapse>
                        <div className='mediumText'> <font face="Arial Black" >История заявок:</font> </div>

                        <div>
                            <Buttonr color="primary" id="toggler1" className="userCard hoverCard">
                                Toggle
                            </Buttonr>
                            <UncontrolledCollapse toggler="#toggler1">
                                <Cardr className="userCardW">
                                    <CardBody>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                                        dignissimos esse fuga! Minus, alias.
                                    </CardBody>
                                </Cardr>
                            </UncontrolledCollapse>
                        </div>

                        <Collapse className="collapseCard" style={{ border: 'none'}}>
                            <Panel showArrow={false} className="userCard1 hoverCard" header="Сентябрь" key="1" bordered={false} color="#ffffff">
                                <p>Короткие разворотные рейсы</p>
                                <p>Длительная смена</p>
                                <p>Хочу работать с переработками</p>
                                <p>Ночь</p>
                            </Panel>
                            <Panel showArrow={false} className="userCard hoverCard" header="Август" key="2" bordered={false} >
                                <p>Короткие разворотные рейсы</p>
                                <p>Длительная смена</p>
                                <p>Хочу работать с переработками</p>
                                <p>Ночь</p>
                            </Panel>
                        </Collapse>

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
                                                styl = "userCard hoverCard";
                                                depart = depart_purple;
                                                land = landing_purple;
                                            } else {
                                                styl = "userCard1 hoverCard";
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
                                                                <div style={{width: "120px", float: "left"}}>
                                                                    <Tag className="userCardW"><font size={5} color={"#5459cd"}><b>1234</b></font></Tag>
                                                                </div>
                                                                <div style={{width: "120px", float: 'left'}}>
                                                                    <font size={4} color={"#ffffff"}>Отбытие</font> <br/>
                                                                    <img src={depart}></img>
                                                                    <font size={4} color={"#ffffff"} className="textRight">{user.time_of_departure}</font>
                                                                </div>
                                                                <div color={"#ffffff"} style={{width: "2px", height: "55px", float: "left"}} className="userCardW">
                                                                </div>
                                                                <div style={{width: "120px", float: 'left'}}>
                                                                    <font size={4} color={"#ffffff"}>Прибытие</font> <br/>
                                                                    <img src={land}></img>
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