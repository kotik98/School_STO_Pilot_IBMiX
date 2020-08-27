import React, {Suspense, Component} from 'react';
// import avatar from "../images/avatar.png";
import plane from '../images/plane.jpg';
import logo from '../images/logo.png';
import {
  Card,
  Tabs,
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
} from 'antd';
import {connect} from 'react-redux';
import {AddPhotoAC, AddUserAC, AddUsersDashBoard} from '../redux/action';

const {Option} = Select;
const {Panel} = Collapse;
const openNotification = (placement, icon, title, message) => {
  notification.open({
    message: title,
    description:
    message,
    placement,
    icon: <Icon type={icon} style={{color: '#108ee9'}}/>,
    duration: 3,
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
      visible: true,
    });
  };

  async componentDidMount() {

    const reqUsersLength = await fetch('/api/usersLength', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    let usersLength = await reqUsersLength.json();

    this.setState({usersLength: usersLength.usersLength});

    if (this.props.users.length === 0) {
      this.setState({loading: true});
    }

    const response = await fetch('/api/profilePilot', {
      headers: {'Content-Type': 'application/json'},
    });
    const result = await response.json();
    console.log(result);
    if (result.response !== 'fail') {

      await this.props.addUser(result.response);

    }

    console.log('есть', this.props.user);

    const reqComparison = await fetch('/api/getAllFly', {

      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: this.props.user.id,
      }),
    });
    let users = await reqComparison.json();

    this.setState({loading: false});

    this.props.AddUsersDashBoard(users);
    console.log('есть ', users, this.props.users, this.props.users.response);

  }

  onChangeLongWork = (checked) => {
    this.setState({showLongWork: checked});
  };

  onChangeShortWork = (checked) => {
    this.setState({showShortWork: checked});
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

  };
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

  ym = () => {
    return (
        '<script src=\'https://mc.yandex.ru/metrika/watch.js\' type=\'text/javascript\'></script>\
        <script type=\'text/javascript\'>\
              try {\
                    var yaCounter57428827 = new Ya.Metrika({\
                    id:57428827,\
                    clickmap:true,\
                    trackLinks:true,\
                    accurateTrackBounce:true,\
                    webvisor:true,\
                    trackHash:true\
                    });\
              } catch(e) {console.log(\'error\') }\
        </script>'
    );
  };

  render() {
    const {TabPane} = Tabs;
    const {cities} = this.state;
    const userMainInfo = JSON.parse(localStorage.getItem('userMainInfo'));
    let searchFlag;

    return (

        <div>
          {(this.state.loading || !this.props.users) && (
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <Spin size="small" tip="Загрузка..."/>
              </div>
          )}
          {this.props.users && (
              <p style={{fontSize: '25px'}} align={'center'}>
                {/* {this.props.user.crewRole === 'капитан' && ('Приветственное сообщение для капитана')}   {this.props.user.crewRole === 'пилот' && ('Приветственное сообщение для пилота')} */}
                Приветственное сообщение для {this.props.user.crewRole}
              </p>

          )}

          <Collapse>
            <Panel header="Фильтры по моему расписанию" key="1">
              <div className="dashBoardContainerMoreFiltres">
                <div className="dashBoardContentMoreFiltres">
                  <Card size="small" title="Длительность смены"
                        className="userCard"
                  >
                    <div style={{textAlign: 'left'}}>
                      <Switch defaultChecked
                              onChange={this.onChangeLongWork}/> Трансатлантические
                      рейсы
                    </div>
                    <div style={{textAlign: 'left'}}>
                      <Switch defaultChecked
                              onChange={this.onChangeShortWork}/> Короткие
                      разворотные рейсы
                    </div>

                  </Card>
                  <Card size="small" title="Время полета" className="userCard">
                    <div style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: 'auto',
                    }}>
                      <Slider range
                              value={[this.state.minPrice, this.state.maxPrice]}
                              max={24}
                              onChange={this.onChangeTime}
                              defaultValue={[
                                this.state.minTime,
                                this.state.maxTime]}
                              marks={{0: 'ч', 24: 'ч.'}}/>
                    </div>
                  </Card>

                  <Card size="small" title="Время полета" className="userCard">
                    <div style={{textAlign: 'left'}}>
                      <Switch defaultChecked
                              onChange={this.onChangeMorning}/> Утро
                    </div>
                    <div style={{textAlign: 'left'}}>
                      <Switch defaultChecked onChange={this.onChangeDay}/> День
                    </div>

                  </Card>

                  <Card size="small" title="Время полета" className="userCard">
                    <div style={{textAlign: 'left'}}>
                      <Switch defaultChecked
                              onChange={this.onChangeEvening}/> Вечер
                    </div>
                    <div style={{textAlign: 'left'}}>
                      <Switch defaultChecked
                              onChange={this.onChangeNight}/> Ночь
                    </div>

                  </Card>
                </div>
              </div>
            </Panel>


          </Collapse>


          <div className="dashBoardContainer">

            <div className="dashBoardContent">
              <Suspense fallback={<h1>Loading posts...</h1>}>
                {this.props.users.response &&

                this.props.users.response.map((user, i) => {

                  // if (this.filterPrise(user.time)) {
                  if (user.city_photo) {

                    console.log(user);

                    let srcImg;
                    if (!user.city_photo) {
                      srcImg = user.city_photo;
                    } else {
                      srcImg = plane;
                    }
                    return (

                        <div key={i}>

                          <Card width='100%'
                                onClick={() => this.showModal(user)}
                                className="userCard hoverCard"
                                cover={
                                  <img
                                      style={{borderRadius: '10px 10px 0px 0px'}}
                                      alt="example"
                                      src={srcImg}
                                  />
                                }
                                type="inner" title="Рейс"
                          >
                            <div>
                              <h3 style={{float: 'left'}}>
                                {user.where_from} - {user.where_to}
                              </h3>
                            </div>
                          </Card>
                        </div>
                    );
                  }
                })}
              </Suspense>
            </div>

            {this.state.modalUser && (
                <div className='modalWidth'>
                  <Modal

                      title="Детали полета"
                      visible={this.state.visible2}
                      onCancel={this.handleCancel2}

                      footer={[]}
                  >
                    <div style={{textAlign: 'center'}}>
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
                      <div style={{height: 60}}>
                        <Icon
                            type="close-circle"
                            style={{fontSize: '62px', float: 'left'}}
                            onClick={this.handleCancel}
                        />
                        <img style={{width: '130px'}} src={logo} alt=""/>
                        <Icon
                            type="heart"
                            theme="twoTone"
                            twoToneColor="#eb2f96"
                            style={{fontSize: '62px', float: 'right'}}
                            onClick={this.isLike}
                        />
                      </div>,
                    ]}
                >
                  <div style={{textAlign: 'center'}}
                       onClick={() => this.tryam()}>
                    {/* <Carousel autoplay>
                                    {this.state.modalUser.foto.map((f, i) =>
                                        <div key={i}>
                                            <Avatar size={180} src={f} />
                                        </div>
                                    )}
                                </Carousel> */}
                  </div>

                  <p>
                    <div style={{height: '40%'}}>
                      <div className="card-container">
                        <br/>
                        <Tag color="green">
                          <div style={{color: 'black', fontSize: '32px'}}>
                            Маршрут: {this.state.modalUser.where_from} - {this.state.modalUser.where_to}
                          </div>
                        </Tag>
                        <br/>
                        <Tabs type="card">
                          <TabPane tab="Общая информация" key="1">
                            <p>
                            </p>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Информация
                                </div>

                              </p>
                            } type="info"/>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Заголовок</div>
                                <div className={'fontModal'}>Информация
                                </div>

                              </p>
                            } type="info"/>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Заголовок</div>
                                <div
                                    className={'fontModal'}>Информация
                                </div>
                              </p>
                            } type="info"/>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Заголовок</div>
                                <div
                                    className={'fontModal'}>Информация
                                </div>
                              </p>
                            } type="info"/>
                          </TabPane>
                          <TabPane tab="Детали" key="2">
                            <p>
                            </p>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Информация
                                </div>

                              </p>
                            } type="info"/>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Заголовок</div>
                                <div className={'fontModal'}>Информация
                                </div>

                              </p>
                            } type="info"/>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Заголовок</div>
                                <div
                                    className={'fontModal'}>Информация
                                </div>
                              </p>
                            } type="info"/>
                            <Alert message={
                              <p>
                                <div style={{color: 'black'}}>Заголовок</div>
                                <div
                                    className={'fontModal'}>Информация
                                </div>
                              </p>
                            } type="info"/>
                          </TabPane>

                        </Tabs>
                      </div>
                      {document.getElementById('container')}
                    </div>

                  </p>
                </Modal>

            )}

            <div className="site-card-border-less-wrapper">
              <div className="site-calendar-demo-card"
                   style={{backgroundColor: 'lightblue'}}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
              </div>
              <Card title="Хотелки на ноябрь" bordered={false}
                    style={{width: 300}}>
                <p>Короткие полеты</p>
                <p>Утром</p>
                <p>В Рио-де-Жанейро</p>
              </Card>
              <Card title="Хотелки на октябрь" bordered={false}
                    style={{width: 300}}>
                <p>Длительные полеты</p>
                <p>Вечером</p>
                <p>В Хабаровск</p>
              </Card>
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


          <footer style={{
            backgroundColor: '#4A76A8',
            color: '#ffffff',
            margin: '0 auto',
            width: '80%',
          }}
                  align={'center'}>
            <p>Зарегистрировано пользователей IBMiX
              : {this.state.usersLength}</p>

            <div dangerouslySetInnerHTML={{__html: this.ym()}}/>
          </footer>
        </div>

    );
  }
}

function mapStateToProps(store) {
  return {
    users: store.usersDashBoard,
    user: store.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => {
      dispatch(AddUserAC(user));
    },
    addPhotos: photos => {
      dispatch(AddPhotoAC(photos));
    },
    AddUsersDashBoard: users => {
      dispatch(AddUsersDashBoard(users));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);