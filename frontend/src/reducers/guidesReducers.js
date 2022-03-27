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

export const guideListReducer = (state = { guides: [] }, action) => {
  switch (action.type) {
    case GUIDES_LIST_REQUEST:
      return { loading: true };
    case GUIDES_LIST_SUCCESS:
      return { loading: false, guides: action.payload };
    case GUIDES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const guideCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GUIDES_CREATE_REQUEST:
      return { loading: true };
    case GUIDES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case GUIDES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const guideUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GUIDES_UPDATE_REQUEST:
      return { loading: true };
    case GUIDES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case GUIDES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const guideViewReducer = (state = {}, action) => {
  switch (action.type) {
    case GUIDE_VIEW_REQUEST:
      return { loading: true };
    case GUIDE_VIEW_SUCCESS:
      return { loading: false, guide: action.payload, success: true };
    case GUIDE_VIEW_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
