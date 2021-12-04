import { combineReducers } from "redux";
import userReducer from "./userReducer";
import commonData from "./commonData";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  user: userReducer,
  commonData,
  errors: errorsReducer,
});
