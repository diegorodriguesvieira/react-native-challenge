import {
  GET_NODE_BLOCKS_START,
  GET_NODE_BLOCKS_SUCCESS,
  GET_NODE_BLOCKS_FAILURE
} from "../constants/actionTypes";
import initialState from "./initialState";

export default function nodeBlocksReducer(
  state = initialState().blocks,
  action
) {
  switch (action.type) {
    case GET_NODE_BLOCKS_START:
      return {
        ...state,
        [action.nodeURL]: {
          data: null,
          error: null,
          loading: true
        }
      };
    case GET_NODE_BLOCKS_SUCCESS:
      return {
        ...state,
        [action.nodeURL]: {
          data: action.res,
          error: null,
          loading: false
        }
      };
    case GET_NODE_BLOCKS_FAILURE:
      return {
        ...state,
        [action.nodeURL]: {
          data: null,
          error: action.errorMessage,
          loading: false
        }
      };
    default:
      return state;
  }
}
