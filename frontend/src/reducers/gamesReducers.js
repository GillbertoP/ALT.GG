import {
  GAMES_LIST_FAIL,
  GAMES_LIST_REQUEST,
  GAMES_LIST_SUCCESS,
} from "../constants/gamesConstants";

export const gameListReducer = (state = { games: [] }, action) => {
  switch (action.type) {
    case GAMES_LIST_REQUEST:
      return { loading: true };
    case GAMES_LIST_SUCCESS:
      return { loading: false, games: action.payload };
    case GAMES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
