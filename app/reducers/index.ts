import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import platform, {PlatformState} from "./platforms";

const rootReducer = combineReducers({
    platform,
    routing: routing as Reducer<any>
});

export interface IState {
    platform: PlatformState;
}

export default rootReducer;
