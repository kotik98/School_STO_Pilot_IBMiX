import React, {Suspense, Component} from 'react';
import {
  Layout,
  Icon,
  notification,
} from 'antd';
import {connect} from 'react-redux';
import HeadPanel from './HeadPanel'
import BidCard from './BidCard'
import {AddPhotoAC, AddUserAC, AddUsersDashBoard} from '../../redux/action';
import './DashBoard3.css';

const { Header, Footer, Sider, Content } = Layout;
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
    return (
        <div className="container">
          <Layout>
            <HeadPanel/>
            <BidCard/>
            <Layout>
              <Content>Content</Content>
              <Sider>Sider</Sider>
            </Layout>
          </Layout>
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