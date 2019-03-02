import {actionCreator, actionCreatorVoid} from "./helpers";
import {Entertainment} from "../reducers/platforms";

export const connect = actionCreator<string>('CONNECT_TO_TWITCH');
export const loading = actionCreatorVoid('LOADING_ENTERTAINMENT_TWITCH');
export const loaded = actionCreator<Entertainment[]>('LOADED_ENTERTAINMENT_TWITCH');
