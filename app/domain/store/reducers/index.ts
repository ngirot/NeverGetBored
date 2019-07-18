import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import platformsReducer from "./platformsReducer"
import PlatformState from "../state/PlatformState"

const rootReducer = combineReducers({
    platform: platformsReducer,
    routing: routing
})

export interface AppState {
    platform: PlatformState
}

export default rootReducer
