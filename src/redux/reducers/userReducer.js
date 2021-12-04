import {
  USER_LOADING,
  USER_LOADED,
  USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_USER_PROFILE,
  GET_FREELANCER_STATICS,
  LOGIN_OTP_SUCCESS,
  LOGIN_OTP_QUESTION_SUCCESS,
  NOT_LOADING,
  GET_NOTIFICATION,
  GET_All_NOTIFICATION,
  RESET_All_NOTIFICATION,
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  tokenScopes: localStorage.getItem("tokenScopes"),
  accountSecurity: JSON.parse(localStorage.getItem("accountSecurity")),
  isAuth: false,
  user: {},
  freelancerStatics: {},
  isLoading: false,
  allNotifications: { latest_notifications: [], notifications: { data: [] } },
  notifications: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case NOT_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenScopes", action.payload.token_scopes);
      localStorage.setItem(
        "accountSecurity",
        JSON.stringify(action.payload.account_security)
      );
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };

    case LOGIN_OTP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenScopes", action.payload.token_scopes);
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };
    case LOGIN_OTP_QUESTION_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };

    case LOGIN_FAIL:
      return {
        isAuth: false,
        user: {},
        freelancerStatics: {},
        isLoading: false,
      };

    case LOGOUT_SUCCESS:
    case USER_FAIL:
      return {
        token: localStorage.removeItem("token"),
        tokenScopes: localStorage.removeItem("tokenScopes"),
        accountSecurity: localStorage.removeItem("accountSecurity"),
        isAuth: false,
        user: {},
        freelancerStatics: {},
        isLoading: false,
      };
    case GET_USER_PROFILE:
      return { ...state, isAuth: true, user: action.payload };
    case GET_FREELANCER_STATICS:
      return { ...state, freelancerStatics: action.payload.statics };
    case GET_All_NOTIFICATION:
      return {
        ...state,
        allNotifications: {
          latest_notifications: [...action.payload.latest_notifications],
          ...action.payload.unread_notification_count,

          notifications: {
            data: [
              ...state.allNotifications.notifications.data,
              ...action.payload.notifications.data,
            ],
          },
        },
      };

    case RESET_All_NOTIFICATION:
      return {
        ...state,
        allNotifications: {
          latest_notifications: [],
          notifications: {
            data: [],
          },
        },
      };
    case GET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
