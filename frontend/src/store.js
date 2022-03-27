import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  guideCreateReducer,
  guideListReducer,
  guideUpdateReducer,
  guideViewReducer,
} from "./reducers/guidesReducers";
import { gameListReducer } from "./reducers/gamesReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  guideList: guideListReducer,
  gameList: gameListReducer,
  guideCreate: guideCreateReducer,
  guideUpdate: guideUpdateReducer,
  guideView: guideViewReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
