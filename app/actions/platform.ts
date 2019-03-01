import {actionCreator} from "./helpers";
import {Entertainment} from "../reducers/platforms";

export const connect = actionCreator<string>('CONNECT_TO_TWITCH');
export const load = actionCreator<Entertainment[]>('LOAD_ENTERTAINMENT_TWITCH');