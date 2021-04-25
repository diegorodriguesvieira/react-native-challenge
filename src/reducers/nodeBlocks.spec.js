import * as ActionTypes from "../constants/actionTypes";
import reducer from "./nodeBlocks";
import initialState from "./initialState";

describe("Reducers::NodeBlocks", () => {
  const getInitialState = () => {
    return initialState().blocks;
  };

  const nodeURL_A = "localhost:3000";
  const nodeURL_B = "localhost:3001";

  const blockData_A = { id: 1, attributes: { index: 1, data: "block 01" } };
  const blockData_B = { id: 2, attributes: { index: 2, data: "block 02" } };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle GET_NODE_BLOCKS_START", () => {
    const action = {
      type: ActionTypes.GET_NODE_BLOCKS_START,
      nodeURL: nodeURL_A
    };
    const expected = {
      [nodeURL_A]: {
        data: null,
        error: null,
        loading: true
      }
    };
    expect(reducer(getInitialState(), action)).toEqual(expected);
  });

  it("should handle GET_NODE_BLOCKS_SUCCESS", () => {
    const appState = {
      [nodeURL_A]: {
        data: blockData_A,
        error: null,
        loading: false
      },
      [nodeURL_B]: {
        data: null,
        error: null,
        loading: true
      }
    };

    const action = {
      type: ActionTypes.GET_NODE_BLOCKS_SUCCESS,
      nodeURL: nodeURL_B,
      res: blockData_B
    };

    const expected = {
      ...appState,
      [nodeURL_B]: {
        data: blockData_B,
        error: null,
        loading: false
      }
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle GET_NODE_BLOCKS_FAILURE", () => {
    const appState = {
      [nodeURL_A]: {
        data: blockData_A,
        error: null,
        loading: false
      },
      [nodeURL_B]: {
        data: null,
        error: null,
        loading: true
      }
    };

    const errorMessage = "Error!";

    const action = {
      type: ActionTypes.GET_NODE_BLOCKS_FAILURE,
      nodeURL: nodeURL_B,
      errorMessage
    };

    const expected = {
      ...appState,
      [nodeURL_B]: {
        data: null,
        error: errorMessage,
        loading: false
      }
    };
    expect(reducer(appState, action)).toEqual(expected);
  });
});
