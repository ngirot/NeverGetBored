import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import platformsReducer from "./platformsReducer"
import PlatformState from "../state/PlatformState"
import applicationConfigurationReducer from "./applicationConfigurationReducer"
import AppConfigurationState from "../state/AppConfigurationState"

const rootReducer = combineReducers({
    platform: platformsReducer,
    configuration: applicationConfigurationReducer,
    routing: routing
})

export interface AppState {
    platform: PlatformState
    configuration: AppConfigurationState
}

export default rootReducer
