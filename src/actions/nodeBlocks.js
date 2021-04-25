import * as types from "../constants/actionTypes";

const getNodeBlocksStart = nodeURL => {
  return {
    type: types.GET_NODE_BLOCKS_START,
    nodeURL
  };
};

const getNodeBlocksSuccess = (nodeURL, res) => {
  return {
    type: types.GET_NODE_BLOCKS_SUCCESS,
    nodeURL,
    res
  };
};

const getNodeBlocksFailure = (nodeURL, errorMessage) => {
  return {
    type: types.GET_NODE_BLOCKS_FAILURE,
    nodeURL,
    errorMessage
  };
};

export function getNodeBlocks(nodeURL) {
  return async dispatch => {
    try {
      dispatch(getNodeBlocksStart(nodeURL));
      const res = await fetch(`${nodeURL}/api/v1/blocks`);

      if (res.status >= 400) {
        throw res.status;
      }

      const json = await res.json();

      dispatch(getNodeBlocksSuccess(nodeURL, json.data));
    } catch (err) {
      dispatch(
        getNodeBlocksFailure(nodeURL, "Sorry, we couldn't load the data.")
      );
    }
  };
}
