import { combineReducers } from "redux";
import ddhkh from "./ddhkh";
import phdnc from "./phdnc";
import document from "./document";
import common from "./common";
import LHCV from "./lhcv";
import PHTAM from "./phtam";
import HDXNP from "./hdxnp";
import PDKCT from "./pdkct";
import HDXDC from "./hdxdc";

export const reducers = combineReducers({
  ddhkh,
  phdnc,
  document,
  common,
  LHCV,
  PHTAM,
  HDXNP,
  PDKCT,
  HDXDC,
});
