import axios from "axios";
import {
  GUIDES_CREATE_FAIL,
  GUIDES_CREATE_REQUEST,
  GUIDES_CREATE_SUCCESS,
  GUIDES_LIST_FAIL,
  GUIDES_LIST_REQUEST,
  GUIDES_LIST_SUCCESS,
  GUIDES_UPDATE_FAIL,
  GUIDES_UPDATE_REQUEST,
  GUIDES_UPDATE_SUCCESS,
  GUIDE_VIEW_FAIL,
  GUIDE_VIEW_REQUEST,
  GUIDE_VIEW_SUCCESS,
} from "../constants/guidesConstants";

export const listGuides = (gameId, guidesType) => async (dispatch) => {
  try {
    dispatch({ type: GUIDES_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    var query = "/api/guides";
    if (gameId) {
      query += "/" + gameId;
    } else {
      query += "/all";
    }

    if (guidesType) {
      query += "/" + guidesType;
    } else {
      query += "/all";
    }

    const { data } = await axios.get(query, config);

    dispatch({ type: GUIDES_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GUIDES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createGuideAction =
  (title, subtitle, content, game_id, category, image) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GUIDES_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/guides/create",
        { title, subtitle, content, game_id, category, image },
        config
      );

      dispatch({
        type: GUIDES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GUIDES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateGuideAction =
  (id, title, subtitle, content, category, image) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GUIDES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/guides/${id}`,
        { title, subtitle, content, category, image },
        config
      );

      dispatch({
        type: GUIDES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GUIDES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const viewGuide = (guidePath) => async (dispatch, getState) => {
  try {
    //guidePath = /guides/{guideId}
    //might have to fix later?
    dispatch({
      type: GUIDE_VIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api${guidePath}`, config);

    dispatch({ type: GUIDE_VIEW_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GUIDE_VIEW_FAIL,
      payload: message,
    });
  }
};
