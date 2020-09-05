import {
  ADD_PHOTO,
  ADD_ISLOGIN,
  EDIT_PROFILE,
  ADD_USER,
  ADD_USERS_DASHBOARD,
  CLEAN_REDUX,
  SET_PRIORITY,
  SET_FLIGHT_DIRECTION,
  SET_DAY_TIME,
  SET_WORK_TIME,
  SET_WORK_DAY,
} from "./type";


// Импорты данных для компонентов заявки (ДнД и радоикнопки)
import { dayTime } from '../components/data_for_all_components/for_dnd_blocks/dayTime';
import { preferences } from '../components/data_for_all_components/for_dnd_blocks/preferences';
import { flightDirection } from '../components/data_for_all_components/for_radio_blocks/flightDirection';
import { workDay } from '../components/data_for_all_components/for_radio_blocks/workDay';
import { workTime } from '../components/data_for_all_components/for_radio_blocks/workTime';
// Закончили импорты данных для заявки

const initialState = {
  photos: [],
  isLogin: false,
  user: {},
  usersDashBoard: [],
  dayTime: dayTime,
  preferences: preferences,
  flightDirection: flightDirection,
  workDay: workDay,
  workTime: workTime,
};

export default function (oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...oldState,
        photos: action.photo
      };

    case ADD_ISLOGIN:
      return {
        ...oldState,
        isLogin: action.isLogin,
      };

    case EDIT_PROFILE:
      return {
        ...oldState,
        user: action.user,
      };

    case ADD_USER:
      return {
        ...oldState,
        user: action.user,
      };
    case ADD_USERS_DASHBOARD:
      return {
        ...oldState,
        usersDashBoard: action.users
      };
    case CLEAN_REDUX:
      return {
        photos: [],
        isLogin: false,
        user: {},
        usersDashBoard: [],
      };
      // Пприоритет полей
    case SET_PRIORITY: {
      console.log("In priority")
      console.log(oldState);
      return {
        ...oldState,
        preferences: action.priority_list,
      };
    }
      // Желаемое направления полета
    case SET_FLIGHT_DIRECTION: {
      console.log("In flightDirection");
      console.log(oldState);
      return {
        ...oldState,
        flightDirection: action.flight_direction,
      }
    }
      // Желаемое время вылета
    case SET_DAY_TIME: {
      console.log("In day time");
      console.log(oldState);
      return {
        ...oldState,
        dayTime: action.daytime,
      }
    }
      // Длина смены
    case SET_WORK_DAY: {
      console.log('In work day');
      console.log(oldState);
      return {
        ...oldState,
        workDay: action.workDay,
      }
    }
      // Про переработки
    case SET_WORK_TIME: {
      console.log('In work time');
      console.log(oldState);

      return {
        ...oldState,
        workTime: action.workTime,
      }
    }

    default:
      return oldState;
  }
}
