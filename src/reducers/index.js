import { combineReducers } from "redux";
import nodes from "./nodes";
import blocks from "./nodeBlocks";

const rootReducer = combineReducers({
  nodes,
  blocks
});

export default rootReducer;
