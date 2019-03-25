import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import platformsReducer from "./platformsReducer";
import PlatformState from "../state/PlatformState";

const rootReducer = combineReducers({
    platform: platformsReducer,
    routing: routing as Reducer<any>
});

export interface AppState {
    platform: PlatformState;
}

export default rootReducer;
