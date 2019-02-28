import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import counter, {TState as TCounterState} from './counter';
import platform, {PlatformState} from "./platforms";

const rootReducer = combineReducers({
    counter,
    platform,
    routing: routing as Reducer<any>
});

export interface IState {
    counter: TCounterState;
    platform: PlatformState;
}

export default rootReducer;
