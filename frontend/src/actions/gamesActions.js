import axios from "axios";
import {
  GAMES_LIST_FAIL,
  GAMES_LIST_REQUEST,
  GAMES_LIST_SUCCESS,
} from "../constants/gamesConstants";

export const listGames = (gameId) => async (dispatch) => {
  try {
    dispatch({ type: GAMES_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    var query = "/api/games";

    if (gameId) {
      query += "/" + gameId;
    }

    const { data } = await axios.get(query, config);

    dispatch({ type: GAMES_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GAMES_LIST_FAIL,
      payload: message,
    });
  }
};
