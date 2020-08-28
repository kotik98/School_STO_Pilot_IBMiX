import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu, Icon, Avatar } from 'antd';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import { AddUserAC, AddPhotoAC } from "../redux/action";


class Navigation extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentDidMount() {

  }

  render() {
    return (
      <div>
        <Menu mode="horizontal" theme='dark' style={{ backgroundColor: '#ffffff', color: 'black' }}>
          <Menu.Item key='profiles' className='navbarText'>
            <Link to={'/profile'}>
              {/* <div style={{ paddingBottom: '10px' }}> */}
              <Avatar size="large" shape="square" icon="user" src="https://img.icons8.com/bubbles/50/000000/short-curly-hair-lady-with-red-glasses.png" />
              &nbsp;&nbsp;&nbsp;&nbsp;
                <span className='navbarUserName'>{this.props.user && this.props.user.firstName} {this.props.user && this.props.user.lastName}</span>
              {/* <span className='navbarUserName'>Имя Фамилия</span> */}
              {/* </div> */}
            </Link>
          </Menu.Item>
          <Menu.Item key='search' className='navbarText'>
            <Link to={'/dashboard3'}>
              <Icon type="home" />
              <span className='navbarUserName'>Главная</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='logout' className='navbarText' style={{ float: 'right' }}>
            <Link to={'/logout'}>
              <Icon type="logout" />
              <span className='navbarUserName'>ВЫЙТИ</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='IBMiX' className='navbarText' style={{ float: 'right' }}>
            <Link to={'/IBMiX'}>
              <Icon type="global" />
              <span className='navbarUserName'>IBM iX®</span>
            </Link>
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    photos: store.photos,
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
    }
  };
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Navigation));
