import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Avatar, Button, Descriptions, Icon, Menu} from 'antd';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';
import {AddUserAC, AddPhotoAC} from '../../redux/action';

class BidCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <div className="bid-card">

        </div>
    );
  }
}

export default BidCard;

