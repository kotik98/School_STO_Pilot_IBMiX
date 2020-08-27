import React, {Component} from 'react';
import {Avatar, Tabs, Icon, Button, Card, Form, DatePicker} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

const {TabPane} = Tabs;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isRedirect: false,
      edit: false,
    };
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    if (this.state.isRedirect) {
      return <Redirect to={'/login'}/>;
    }
    let linkEdite = '';

    if (this.props.user.crewRole === 'командир') {
      linkEdite = '/edit/profile_comander';
    } else if (this.props.user.crewRole !== 'командир') {
      linkEdite = '/edit/profile_pilot';
    } else {
      linkEdite = '/login';
    }

    console.log(linkEdite);

    return (
        <div style={{padding: '10px'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card
                style={{
                  borderRadius: '20px',
                  display: 'flex',
                  width: '800px',
                  marginTop: '20px',
                  background:
                      'linear-gradient(6deg, rgba(132,100,250,1) 0%, rgba(74,118,168,1) 100%)',
                }}
            >
              <div style={{display: 'flex'}}>
                <div>
                  {this.props.photos.length !== 0 && (
                      <Avatar
                          size={150}
                          icon="user"
                          src={this.props.photos[0].thumbUrl}
                      />
                  )}
                </div>

                <div>
                  <Link to={linkEdite}>
                    <Button ghost="default" icon="edit">
                      Редактировать
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                {this.props.user && (
                    <div>
                      <h1
                          style={{color: '#ffffff'}}
                      >{`${this.props.user.firstName} ${this.props.user.lastName}`}</h1>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon
                            type="user"/> &nbsp; Должность: {`${this.props.user.crewRole}`}
                      </span>{' '}
                          <span style={{fontWeight: 'normal'}}>
                        {this.props.user.username}
                      </span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon type="calendar"/> &nbsp; Стаж работы в должности:  с {`${this.props.user.standingFromDateInRole}`}
                      </span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon type="phone"/> &nbsp; Номер телефона:{' '}
                      </span>{' '}
                          <span style={{fontWeight: 'normal'}}>
                        {this.props.user.phone}
                      </span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon type="mail"/> &nbsp; E-mail:{' '}
                      </span>{' '}
                          <span style={{fontWeight: 'normal'}}>
                        {this.props.user.email}
                      </span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon type="calendar"/> &nbsp; Стаж работы в авиакомпании:  с {`${this.props.user.standingFromDate}`}
                      </span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon
                            type="global"/> &nbsp; Индекс сеньорити: {`${this.props.user.reliabilityIndex}`}
                      </span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{color: '#ffffff'}}>
                      <span style={{fontWeight: 'bold'}}>
                        <Icon
                            type="bell"/> &nbsp; Индекс поощрений и наказаний: {`${this.props.user.rewardsAndPunishments}`}
                      </span>
                        </h3>
                      </div>
                      {this.props.user.vk && (
                          <div>
                            <h3 style={{color: '#ffffff'}}>
                        <span style={{fontWeight: 'bold'}}>
                          <Icon type="global"/> &nbsp; VK:{' '}
                        </span>{' '}
                              <span style={{fontWeight: 'normal'}}>
                          {this.props.user.vk}
                        </span>
                            </h3>
                          </div>
                      )}
                      {this.props.user.nativeLocation && (
                          <div>
                            <h3 style={{color: '#ffffff'}}>
                        <span style={{fontWeight: 'bold'}}>
                          <Icon type="compass"/> &nbsp; Приоритетный город для полетов:{' '}
                        </span>{' '}
                              <span style={{fontWeight: 'normal'}}>
                          {this.props.user.nativeLocation}
                        </span>
                            </h3>
                          </div>
                      )}
                    </div>
                )}


                <br/>
              </div>
            </Card>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card className="newCard">
              <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                      <span>
                    <Icon type="picture"/>
                    Все заявки
                  </span>
                    }
                    key="1"
                >
                  <div style={{display: 'block', textAlign: 'center'}}>
                    {/* {this.props.photos &&
                    this.props.photos.map((url, i) => {
                      return (
                        <Avatar
                          size={150}
                          icon="user"
                          shape="square"
                          src={url.thumbUrl}
                          style={{ margin: "10px 10px 0 0" }}
                          onClick={this.showModal}
                          key={i}
                        />
                      );
                    })} */}
                    Какая то информация
                  </div>
                </TabPane>
                <TabPane
                    tab={
                      <span>
                    <Icon type="picture" theme="twoTone"
                          twoToneColor="#eb2f96"/>
Удовлетворенные заявки
                  </span>
                    }
                    key="2"
                >
                  <div>
                    Какая то информация
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    edit: store.editProfile,
    photos: store.photos,
    user: store.user,
  };
}

export default Form.create()(connect(mapStateToProps)(Profile));
