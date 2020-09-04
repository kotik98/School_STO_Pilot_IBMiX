import React, { Suspense, Component } from "react";
// import avatar from "../images/avatar.png";
import plane from "../images/plane.jpg";
import logo from '../images/logo.png';
import ItemList from '../components/DnD/itemList';
import ItemList_day from '../components/DnD_day/itemList';

import RadioButtonList from './lineFlight/RadioButtonList';

import RadioButtonList_WorkDay from './WorkTime/RadioButtonList';
import { data_work_time } from './WorkTime/radio_data'
import { data_work_day } from './WorkDay/radio_data'

import RadioButtonList_WorkTime from './WorkDay/RadioButtonList';


import CalendarWithButtons from './CalendarWithButtons';


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

import { AddPhotoAC, AddUserAC, AddUsersDashBoard, SetPriority, SetFlightDirection, SetDayTime } from "../redux/action";

import './DashBoard.css';
import {
    MoreOutlined,
} from '@ant-design/icons';

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
            newWish: false,
            preference: true,
            preference1: false,
            preference2: false,
            preference3: false,
            preference4: false,
            preference5: false,
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
        this.dispatcher_func = { SetPriority }

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

    onNewWishList = () => {
        this.setState({
            newWish: !this.state.newWish,
        });
    };

    step = () => {
        this.setState({
            preference: false,
            preference1: true,
            preference2: false,
            preference3: false,
            preference4: false,
            preference5: false,
        });
        console.log(this.state)
    };

    stepBack = () => {
        this.setState({
            preference: true,
            preference1: false,
            preference2: false,
            preference3: false,
            preference4: false,
            preference5: false,
        });
        console.log(this.state)
    };

    step3 = () => {

        this.setState({
            preference: false,
            preference1: false,
            preference2: true,
            preference3: false,
            preference4: false,
            preference5: false,
        });
    };

    step4 = () => {

        this.setState({
            preference: false,
            preference1: false,
            preference2: false,
            preference3: true,
            preference4: false,
            preference5: false,
        });
    };

    step5 = () => {

        this.setState({
            preference: false,
            preference1: false,
            preference2: false,
            preference3: false,
            preference4: true,
            preference5: false,
        });
    };
    step6 = () => {

        this.setState({
            preference: false,
            preference1: false,
            preference2: false,
            preference3: false,
            preference4: false,
            preference5: true,
        });
    };



    render() {
        const { TabPane } = Tabs;
        const { cities } = this.state;
        const userMainInfo = JSON.parse(localStorage.getItem('userMainInfo'));
        let searchFlag;

        return (


            <div>

                <div className="dashBoardContainer">
                    {/* START HEAD PANEL */}
                    <div className="head-panel">
                        {/*<span className="dots" />*/}
                        {/*<MoreOutlined />*/}
                        <Avatar
                            className="user-avatar"
                            size="large"
                            shape="square"
                            icon="user"
                            src="https://img.icons8.com/bubbles/50/000000/short-curly-hair-lady-with-red-glasses.png"
                        />
                        <div className='user-info'>
                            <span className='user-info--name'>{this.props.user &&
                                this.props.user.firstName}</span>
                            <span className='user-info--name'>{this.props.user &&
                                this.props.user.lastName}</span>
                        </div>
                        <div className='bidding-info'>
                            <span className='bidding-info--start'>Старт подачи</span>
                            <span className='bidding-info--finish'>Финиш подачи</span>
                        </div>
                        <div className='bidding-date'>
                            <span className='bidding-date--digit'>23.08.2020</span>
                            <span className='bidding-date--digit'>23.08.2020</span>
                        </div>
                        <div className='date-clock'>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.0001 4.8148C8.48154 4.82996 4.81494 8.48298 4.81494 13C4.81494 17.517 8.48154 21.17 13.0001 21.1852V4.8148Z"
                                    fill="#FFDE84" />
                                <path
                                    d="M13.0001 25.6905C6.00481 25.6905 0.30957 19.9953 0.30957 13C0.30957 6.00477 6.00481 0.309525 13.0001 0.309525C19.0667 0.309525 24.2977 4.62739 25.4584 10.5702C25.6132 11.3595 25.6905 12.1798 25.6905 13C25.6905 19.9953 19.9953 25.6905 13.0001 25.6905ZM13.0001 1.74881C6.7941 1.74881 1.74886 6.79405 1.74886 13C1.74886 19.206 6.7941 24.2512 13.0001 24.2512C19.206 24.2512 24.2512 19.206 24.2512 13C24.2512 12.2726 24.1893 11.5452 24.0501 10.8488C23.0132 5.57143 18.3703 1.74881 13.0001 1.74881Z"
                                    fill="#5459CD" />
                                <path
                                    d="M13 26C5.83453 26 0 20.1655 0 13C0 5.83453 5.83453 0 13 0C19.206 0 24.5762 4.42619 25.7679 10.5083C25.9226 11.3286 26 12.1643 26 13C26 20.1655 20.1655 26 13 26ZM13 0.619048C6.175 0.619048 0.619048 6.175 0.619048 13C0.619048 19.825 6.175 25.381 13 25.381C19.825 25.381 25.381 19.825 25.381 13C25.381 12.1952 25.3036 11.406 25.1488 10.6321C24.0345 4.82857 18.9119 0.619048 13 0.619048ZM13 24.5607C6.62381 24.5607 1.43929 19.3762 1.43929 13C1.43929 6.62381 6.62381 1.43929 13 1.43929C18.525 1.43929 23.2917 5.37024 24.3441 10.7714C24.4833 11.4988 24.5607 12.2417 24.5607 12.9845C24.5607 19.3762 19.3762 24.5607 13 24.5607ZM13 2.05833C6.96429 2.05833 2.05833 6.96429 2.05833 13C2.05833 19.0357 6.96429 23.9417 13 23.9417C19.0357 23.9417 23.9417 19.0357 23.9417 13C23.9417 12.2881 23.8798 11.5917 23.7405 10.9107C22.7345 5.7881 18.231 2.05833 13 2.05833Z"
                                    fill="#5459CD" />
                                <path
                                    d="M19.8874 15.4762H12.9231C11.9326 15.4762 11.1433 14.6869 11.1433 13.6964V4.56547C11.1433 3.93095 11.6695 3.40475 12.304 3.40475C12.9385 3.40475 13.4647 3.93095 13.4647 4.56547V13.1548H19.8874C20.5219 13.1548 21.0481 13.681 21.0481 14.3155C21.0481 14.95 20.5219 15.4762 19.8874 15.4762Z"
                                    fill="#5459CD" />
                                <path
                                    d="M13.0003 16.0953C14.7097 16.0953 16.0955 14.7095 16.0955 13C16.0955 11.2906 14.7097 9.90477 13.0003 9.90477C11.2908 9.90477 9.90503 11.2906 9.90503 13C9.90503 14.7095 11.2908 16.0953 13.0003 16.0953Z"
                                    fill="#5459CD" />
                            </svg>
                        </div>
                        <div>
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d)">
                                    <rect width="23" height="23" rx="7"
                                        transform="matrix(-1 0 0 1 32 9)" fill="white" />
                                </g>
                                <path
                                    d="M25 20.5L18.9429 26.6518C18.4857 27.1161 17.7714 27.1161 17.3143 26.6518C16.8571 26.1875 16.8571 25.4621 17.3143 24.9978L21.7714 20.471L17.3429 16.0022C16.8857 15.5379 16.8857 14.8125 17.3429 14.3482C17.8 13.8839 18.5143 13.8839 18.9714 14.3482L25 20.5Z"
                                    fill="#282828" />
                                <defs>
                                    <filter id="filter0_d" x="0" y="0" width="41" height="41"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feMorphology radius="1" operator="erode" in="SourceAlpha"
                                            result="effect1_dropShadow" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feColorMatrix type="matrix"
                                            values="0 0 0 0 0.620833 0 0 0 0 0.620833 0 0 0 0 0.620833 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix"
                                            result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic"
                                            in2="effect1_dropShadow" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className='bidding-stats'>
                            <span className='bidding-stats--first'>
                                70
            </span>
                /
                <span className='bidding-stats--second'>
                                30
            </span>%
              </div>
                        <div>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d)">
                                    <path
                                        d="M33 20C33 27.1792 27.1792 33 20 33C12.8208 33 7 27.1792 7 20C7 12.8208 12.8208 7 20 7C26.3247 7 31.5978 11.5208 32.759 17.5096C32.9197 18.3129 33 19.1455 33 20Z"
                                        fill="#5459CD" />
                                </g>
                                <g filter="url(#filter1_d)">
                                    <path
                                        d="M33 18.0087C26.593 19.5005 20 21 20 21V7C26.4442 7 31.8168 11.7355 33 18.0087Z"
                                        fill="#FFDE84" />
                                </g>
                                <defs>
                                    <filter id="filter0_d" x="0" y="0" width="40" height="40"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3.5" />
                                        <feColorMatrix type="matrix"
                                            values="0 0 0 0 0.328368 0 0 0 0 0.3474 0 0 0 0 0.804167 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix"
                                            result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic"
                                            in2="effect1_dropShadow" result="shape" />
                                    </filter>
                                    <filter id="filter1_d" x="13" y="0" width="27" height="28"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3.5" />
                                        <feColorMatrix type="matrix"
                                            values="0 0 0 0 0.328368 0 0 0 0 0.3474 0 0 0 0 0.804167 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix"
                                            result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic"
                                            in2="effect1_dropShadow" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <Button type="primary" className='bidding-btn' onClick={this.onNewWishList}>Новая заявка</Button>
                        <div className='settings-icon'>
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                    <path
                                        d="M10.0608 0H8.93802C7.59503 0 6.50523 1.01931 6.4612 2.32833V2.36052C6.45019 2.55365 6.34011 2.71459 6.15297 2.80043C5.66861 3.01502 5.20627 3.27253 4.77696 3.57296C4.61183 3.69099 4.40268 3.70172 4.23756 3.61588L4.21554 3.60515C3.02667 2.99356 1.5736 3.39056 0.902101 4.5279L0.329679 5.4721C-0.341816 6.60944 0.0214521 8.03648 1.1663 8.72318C1.33142 8.81974 1.41948 9.00215 1.39747 9.20601C1.37545 9.46352 1.35343 9.73176 1.35343 9.98927C1.35343 10.2468 1.36444 10.515 1.39747 10.7725C1.41948 10.9657 1.33142 11.1588 1.1663 11.2554C0.0324601 11.9635 -0.341816 13.3906 0.329679 14.5279L0.891093 15.4828C1.56259 16.6202 3.01566 17.0172 4.20453 16.4056L4.22655 16.3948C4.39167 16.309 4.60083 16.3197 4.76595 16.4378C5.19526 16.7382 5.6576 16.9957 6.14196 17.2103C6.3291 17.2961 6.45019 17.4571 6.45019 17.6502V17.6824C6.50523 18.9807 7.59503 20 8.93802 20H10.0608C11.4038 20 12.4936 18.9807 12.5377 17.6717V17.5966C12.5487 17.4142 12.6588 17.2425 12.8459 17.1567C13.3082 16.9528 13.7486 16.6953 14.1669 16.4056C14.332 16.2876 14.5411 16.2768 14.7173 16.3627L14.7943 16.4056C15.9832 17.0172 17.4363 16.6202 18.1078 15.4828L18.6692 14.5279C19.3407 13.3906 18.9774 11.9635 17.8326 11.2768L17.7335 11.2232C17.5684 11.1266 17.4803 10.9442 17.5023 10.7511C17.5243 10.5043 17.5354 10.2575 17.5354 10.0215C17.5354 9.78541 17.5243 9.5279 17.5023 9.29185C17.4803 9.09871 17.5684 8.91631 17.7335 8.81974L17.8326 8.76609C18.9664 8.06867 19.3407 6.64163 18.6692 5.51502L18.1078 4.56009C17.4363 3.42275 15.9832 3.02575 14.7943 3.63734L14.7173 3.68026C14.5411 3.76609 14.332 3.75537 14.1669 3.63734C13.7486 3.34764 13.3082 3.09013 12.8459 2.88627C12.6588 2.80043 12.5487 2.63948 12.5377 2.44635V2.37124C12.4936 1.01931 11.4038 0 10.0608 0ZM4.45772 4.84979C4.80998 4.84979 5.16224 4.74249 5.47047 4.5279C5.83373 4.27039 6.23003 4.05579 6.64833 3.87339C7.25378 3.60515 7.65007 3.03648 7.67209 2.40343V2.37124C7.6941 1.70601 8.25552 1.18026 8.93802 1.18026H10.0608C10.7434 1.18026 11.3048 1.70601 11.3268 2.37124V2.44635C11.3488 3.0794 11.7341 3.63734 12.3285 3.91631C12.7248 4.09871 13.0991 4.3133 13.4513 4.56009C13.9907 4.94635 14.6953 4.98927 15.2787 4.68884L15.3557 4.64592C15.9612 4.33476 16.6987 4.53863 17.051 5.11803L17.6124 6.07296C17.9537 6.65236 17.7665 7.38197 17.1831 7.73605L17.084 7.7897C16.5336 8.12232 16.2254 8.73391 16.2914 9.37768C16.3135 9.58154 16.3245 9.79614 16.3245 10C16.3245 10.2039 16.3135 10.4185 16.2914 10.6223C16.2254 11.2661 16.5336 11.8777 17.084 12.2103L17.1831 12.2639C17.7665 12.618 17.9537 13.3476 17.6124 13.927L17.051 14.882C16.7097 15.4614 15.9612 15.6652 15.3557 15.3541L15.2787 15.3112C14.6953 15.0107 14.0018 15.0536 13.4513 15.4399C13.0991 15.6867 12.7248 15.9013 12.3285 16.0837C11.7341 16.3519 11.3488 16.9206 11.3268 17.5536V17.6288C11.3048 18.294 10.7544 18.8197 10.0608 18.8197H8.93802C8.25552 18.8197 7.6941 18.294 7.67209 17.6288V17.5966C7.65007 16.9528 7.25378 16.3841 6.64833 16.1266C6.24103 15.9442 5.84474 15.7296 5.47047 15.4721C4.93107 15.0966 4.23756 15.0536 3.65413 15.3541L3.63211 15.3648C3.02667 15.676 2.28912 15.4721 1.93686 14.8927L1.37545 13.9378C1.0342 13.3584 1.22134 12.6288 1.80477 12.2747C2.36618 11.9313 2.67441 11.3197 2.59735 10.676C2.57533 10.4506 2.56433 10.2253 2.56433 10.0107C2.56433 9.79614 2.57533 9.56009 2.59735 9.34549C2.6634 8.70172 2.35517 8.0794 1.80477 7.74678C1.22134 7.3927 1.0342 6.66309 1.37545 6.08369L1.93686 5.12875C2.27811 4.54936 3.02667 4.34549 3.63211 4.65665L3.65413 4.66738C3.90732 4.78541 4.18252 4.84979 4.45772 4.84979Z"
                                        fill="#282828" />
                                    <path
                                        d="M9.45595 5.60085C11.9486 5.60085 13.9693 7.57042 13.9693 10C13.9693 12.4296 11.9486 14.3991 9.45595 14.3991C6.96331 14.3991 4.94263 12.4296 4.94263 10C4.94263 7.57042 6.96331 5.60085 9.45595 5.60085Z"
                                        fill="#5459CD" />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="19" height="20" fill="white"
                                            transform="matrix(1 0 0 -1 0 20)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {(this.state.loading || !this.props.users) && (
                        <div style={{ textAlign: "center", marginTop: '10px' }}>
                            <Spin size="small" tip="Загрузка..." />
                        </div>
                    )}

                    {this.state.visibleSort === true && (
                        <div className='modalWidth'>
                            <Modal
                                width='700px'
                                title="Фильтрация расписания рейсов"
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
                </div>

                {(this.state.newWish && this.state.preference)
                    && (
                        < div className="dashBoardContainer">

                            <div className="dashBoardContentDrag borderDesign" style={{ borderColor: "4px double black;" }}>


                                <Card size="small"
                                    className="userCardSlider"
                                > <div className='newForm'>Новая Заявка &nbsp;<span className='newForm2'>🡲 &nbsp;&nbsp;&nbsp; 1. Приоритет заявки</span> &nbsp;&nbsp;&nbsp;<span className='newForm3'>Переместите бокс по приоритету</span></div>


                                    <div style={{ textAlign: "left", height: '300px' }}>
                                        {/* <ItemList />
                                         */}
                                        <ItemList />
                                    </div>

                                    <Button type="primary" className='bidding-btn' style={{ float: 'right', marginRight: '10px' }} onClick={this.step}><span style={{ marginLeft: '10px' }} >🡲</span><span style={{ marginLeft: '35px' }}>Далее</span> </Button>

                                </Card>
                            </div>
                        </div >
                    )}

                {(this.state.newWish && this.state.preference1) &&

                    < div className="dashBoardContainer">

                        <div className="dashBoardContentDrag borderDesign" style={{ borderColor: "4px double black;" }}>
                            <Card size="small"
                                className="userCardSlider"
                            >
                                <div className='newForm'>Новая Заявка &nbsp;<span className='newForm2'>🡲 &nbsp;&nbsp;&nbsp; 2. Направление полета</span> &nbsp;&nbsp;&nbsp;<span className='newForm3'>Выберите одни из вариантов</span></div>

                                <div style={{ textAlign: "center", height: '300px' }}>
                                    {this.props.flight_direction && (
                                        <RadioButtonList dispatcher_func={SetFlightDirection} data={this.props.flight_direction} />

                                    )}
                                    {/* <RadioButtonList /> */}

                                </div>

                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step3}><span style={{ marginLeft: '10px' }} >🡲</span><span style={{ marginLeft: '35px' }}>Далее</span> </Button>
                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.stepBack}><span style={{ marginLeft: '10px' }} >🡸</span><span style={{ marginLeft: '35px' }}>Назад</span> </Button>

                            </Card>
                        </div>
                    </div >
                }

                {(this.state.newWish && this.state.preference2) &&

                    < div className="dashBoardContainer">

                        <div className="dashBoardContentDrag borderDesign" style={{ borderColor: "4px double black;" }}>
                            <Card size="small"
                                className="userCardSlider"
                            >
                                <div className='newForm'>Новая Заявка &nbsp;<span className='newForm2'>🡲 &nbsp;&nbsp;&nbsp; 3. Выбор приоритетного времени вылета</span> &nbsp;&nbsp;&nbsp;<span className='newForm3'>Выберите одни из вариантов</span></div>

                                <ItemList_day />

                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step4}><span style={{ marginLeft: '10px' }} >🡲</span><span style={{ marginLeft: '35px' }}>Далее</span> </Button>

                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step}><span style={{ marginLeft: '10px' }} >🡸</span><span style={{ marginLeft: '35px' }}>Назад</span> </Button>

                            </Card>
                        </div>
                    </div >
                }



                {(this.state.newWish && this.state.preference3) &&

                    < div className="dashBoardContainer">

                        <div className="dashBoardContentDrag borderDesign" style={{ borderColor: "4px double black;" }}>
                            <Card size="small"
                                className="userCardSlider"
                            >
                                <div className='newForm'>Новая Заявка &nbsp;<span className='newForm2'>🡲 &nbsp;&nbsp;&nbsp; 4. Преференции переработок</span> &nbsp;&nbsp;&nbsp;<span className='newForm3'>Выберите одни из вариантов</span></div>

                                <div style={{ textAlign: "center", height: '300px' }}>
                                    {this.props.flight_direction && (
                                        <RadioButtonList_WorkDay dispatcher_func={SetFlightDirection} data={data_work_time} />

                                    )}
                                    {/* <RadioButtonList /> */}

                                </div>

                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step5}><span style={{ marginLeft: '10px' }} >🡲</span><span style={{ marginLeft: '35px' }}>Далее</span> </Button>
                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step3}><span style={{ marginLeft: '10px' }} >🡸</span><span style={{ marginLeft: '35px' }}>Назад</span> </Button>

                            </Card>
                        </div>
                    </div >
                }


                {(this.state.newWish && this.state.preference4) &&

                    < div className="dashBoardContainer">

                        <div className="dashBoardContentDrag borderDesign" style={{ borderColor: "4px double black;" }}>
                            <Card size="small"
                                className="userCardSlider"
                            >
                                <div className='newForm'>Новая Заявка &nbsp;<span className='newForm2'>🡲 &nbsp;&nbsp;&nbsp; 5. Префренции длительности смены</span> &nbsp;&nbsp;&nbsp;<span className='newForm3'>Выберите одни из вариантов</span></div>

                                <div style={{ textAlign: "center", height: '300px' }}>
                                    {this.props.flight_direction && (
                                        <RadioButtonList_WorkTime dispatcher_func={SetFlightDirection} data={data_work_day} />

                                    )}
                                    {/* <RadioButtonList /> */}

                                </div>

                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step6}><span style={{ marginLeft: '10px' }} >🡲</span><span style={{ marginLeft: '35px' }}>Далее</span> </Button>
                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step4}><span style={{ marginLeft: '10px' }} >🡸</span><span style={{ marginLeft: '35px' }}>Назад</span> </Button>

                            </Card>
                        </div>
                    </div >
                }


                {(this.state.newWish && this.state.preference5) &&

                    < div className="dashBoardContainer">

                        <div className="dashBoardContentDrag borderDesign" style={{ borderColor: "4px double black;" }}>
                            <Card size="small"
                                className="userCardSlider"
                            >
                                <div className='newForm'>Новая Заявка &nbsp;<span className='newForm2'>🡲 &nbsp;&nbsp;&nbsp; 6. Выбор желаемых выходных дней</span> &nbsp;&nbsp;&nbsp;<span className='newForm3'>Выберите одни из вариантов</span></div>

                                <div className={'calendar_block'}>
                                    <div style={{
                                        display: 'flex', flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>

                                        <div className="site-calendar-demo-card" style={{ backgroundColor: '#C2D5FB', width: '300px', borderRadius: '10px', marginRight: '21px' }}>
                                            <CalendarWithButtons onPanelChange={onPanelChange} />
                                        </div>
                                        <div className="site-calendar-demo-card" style={{ backgroundColor: '#C2D5FB', width: '300px', borderRadius: '10px', marginRight: '21px' }}>
                                            <CalendarWithButtons onPanelChange={onPanelChange} />
                                        </div>
                                        <div className="site-calendar-demo-card" style={{ backgroundColor: '#C2D5FB', width: '300px', borderRadius: '10px' }}>
                                            <CalendarWithButtons onPanelChange={onPanelChange} />
                                        </div>
                                    </div>
                                </div>
                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }}><span style={{ marginLeft: '10px' }} >&#10004;</span><span style={{ marginLeft: '35px' }}>Сохранить</span> </Button>

                                <Button type="primary" className='bidding-btn-step' style={{ float: 'right', marginRight: '0px' }} onClick={this.step5}><span style={{ marginLeft: '10px' }} >🡸</span><span style={{ marginLeft: '35px' }}>Назад</span> </Button>

                            </Card>
                        </div>
                    </div >
                }



                {/* <ItemList dispatcher_func={SetPriority} data={this.props.priority_list_for_application}/>
                <RadioButtonList dispatcher_func={SetFlightDirection} data={this.props.flight_direction}/>
                <ItemList dispatcher_func={SetDayTime} data={this.props.daytime}/> */}

                <div className="dashBoardContainer">

                    <div className="dashBoardContent">

                        <div className='yourTrip'> <p  >Ваши Рейсы</p> </div>
                        <div className='sortString' > <p onClick={() => this.showSort()}>Сортировка</p></div>

                        <div className="flightsCard">
                            <Suspense fallback={<h1>Loading posts...</h1>}>
                                {this.props.users.response &&

                                    this.props.users.response.map((user, i) => {

                                        if (user.city_photo) {

                                            console.log(user)

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
                                                            {/* <div style={{ background: 'white', borderRadius: '10px', marginRight: '10px', padding: '10px' }}>
                                                                Вылет <br />
                                                                <Tag color="orange">{user.time_of_departure}</Tag>
                                                            </div> */}
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
                                                        <div style={{ width: "90px", float: "left" }}>
                                                            <Tag className="userCardW"><font size={3} color={"#5459cd"}><b>1234</b></font></Tag>
                                                        </div>
                                                        <div style={{ width: "95px", float: 'left' }}>
                                                            <font size={2} color={"#ffffff"}>Отбытие</font> <br />
                                                            <img src={depart}></img>
                                                            <font size={2} color={"#ffffff"} className="textRight">{user.time_of_departure}</font>
                                                        </div>
                                                        <div color={"#ffffff"} style={{ width: "2px", height: "55px", float: "left" }} className="userCardW">
                                                        </div>
                                                        <div style={{ width: "95px", float: 'left' }}>
                                                            <font size={2} color={"#ffffff"}>Прибытие</font> <br />
                                                            <img src={land}></img>
                                                            <font size={2} color={"#ffffff"} className="textRight">{user.time_of_arrival}</font>

                                                        </div>
                                                    </Card>
                                                );
                                            }
                                        })}
                                </Suspense>
                            </div>
                        </div>

                    </div>

                    {/* <div className='rightBar'>


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
                    </div> */}

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
        user: store.user,
        priority_list_for_application: store.priority,
        flight_direction: store.flight_direction,
        daytime: store.daytime,
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