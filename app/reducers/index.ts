import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import PlatformState from "./PlatformState";
import platformsReducer from "./platformsReducer";

const rootReducer = combineReducers({
    platform: platformsReducer,
    routing: routing as Reducer<any>
});

export interface AppState {
    platform: PlatformState;
}

export default rootReducer;
