import React, { Suspense, Component } from "react";
// import avatar from "../images/avatar.png";
import plane from "../images/plane.jpg";
import logo from '../images/logo.png';
import ItemList from '../components/DnD/itemList';
import RadioButtonList from '../components/BeautyRadioButton/RadioButtonList';



import { Tabs } from 'antd';

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
        // console.log(result);
        if (result.response !== 'fail') {

            await this.props.addUser(result.response);


        }

        // console.log('есть', this.props.user)

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
        // console.log("есть ", users, this.props.users, this.props.users.response);

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
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel2 = e => {
        // console.log(e);
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
                                            <div>

                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                )}

                {/* </Collapse> */}

                {/* Будем пастить сюда! */}
                <ItemList />
                <RadioButtonList />
                {/* Будем пастить сюда! */}
                <div className="dashBoardContainer">
                            
                    <div className="dashBoardContent">
                        <div className='yourTrip'> <p  >Ваши Рейсы</p> </div>
                        <div className='sortString' > <p onClick={() => this.showSort()}>Сортировка</p></div>

                        <div className="flightsCard">
                            <Suspense fallback={<h1>Loading posts...</h1>}>
                                {this.props.users.response &&

                                    this.props.users.response.map((user, i) => {

                                        // if (this.filterPrise(user.time)) {
                                        if (user.city_photo) {

                                            // console.log(user)

                                            let srcImg;
                                            if (!user.city_photo) {
                                                srcImg = user.city_photo;
                                            } else {
                                                srcImg = plane;
                                            }
                                            return (

                                                <div key={i}>

                                                    <Card width='100%'
                                                        // onClick={() => this.showModal(user)}
                                                        className="userCard hoverCard"
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
                                                        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Рейс <br />
                                                                <Tag color="magenta">7634</Tag>
                                                            </div>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Маршрут <br />
                                                                <Tag color="red">{user.where_from}-{user.where_to}</Tag>
                                                            </div>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Время полета <br />
                                                                <Tag color="volcano">{user.flight_time}</Tag>
                                                            </div>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Вылет <br />
                                                                <Tag color="orange">{user.time_of_departure}</Tag>
                                                            </div>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Прибытие <br />
                                                                <Tag color="gold">{user.time_of_arrival}</Tag>
                                                            </div>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Сложность <br />
                                                                <Tag color="lime">{user.level_flights}</Tag>
                                                            </div>
                                                            <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Аэропорт <br />
                                                                <Tag color="lime">{user.airport_name}</Tag>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            );
                                        }
                                    })}
                            </Suspense>
                        </div>
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
                            <div className="site-calendar-demo-card" style={{ backgroundColor: '#F6F9FE;' }}>
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