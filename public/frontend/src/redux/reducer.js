import {
  ADD_PHOTO,
  ADD_ISLOGIN,
  EDIT_PROFILE,
  ADD_USER,
  ADD_USERS_DASHBOARD,
  CLEAN_REDUX
} from "./type";

const initialState = {
  photos: [],
  isLogin: false,
  user: {},
  usersDashBoard: [],
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

    default:
      return oldState;
  }
}
