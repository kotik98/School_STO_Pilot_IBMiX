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
        <Menu mode="horizontal" theme='dark' style={{ backgroundColor: '#4A76A8', color: '#ffffff' }}>
          <Menu.Item key='profiles'>
            <Link to={'/profile'}>
              <Avatar size="large" shape="square" icon="user" src={this.props.photos.length !== 0 && this.props.photos[0].thumbUrl} />
              &nbsp;&nbsp;&nbsp;&nbsp;
                <span className='navbarUserName'>{this.props.user && this.props.user.firstName}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='team' className='navbarText'>
            <Link to={'/dashboard3'}>
              <Icon type="team" />
              Главная
            </Link>
          </Menu.Item>

          <Menu.Item key='logout' className='navbarText' style={{ float: 'right' }}>
            <Link to={'/logout'}>
              <Icon type="logout" />
              ВЫЙТИ
            </Link>
          </Menu.Item>
          <Menu.Item key='IBMiX' className='navbarText' style={{ float: 'right' }}>
            <Link to={'/IBMiX'}>
              <Icon type="global" />
              IBMiX
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
